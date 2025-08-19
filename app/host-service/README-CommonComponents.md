# 공통 컴포넌트 사용 가이드

host-service에서 제공하는 공통 컴포넌트들을 리모트 앱에서 사용하는 방법을 설명합니다.

## 제공되는 컴포넌트

### 1. ArboristTree (트리 컴포넌트)
- 계층적 데이터를 표시하는 트리 컴포넌트
- 폴더/파일 아이콘 지원
- 다중 선택 지원
- 확장/축소 기능

### 2. DataGrid (데이터 그리드 컴포넌트)
- MUI X Data Grid 기반의 고급 데이터 테이블
- 정렬, 필터링, 페이지네이션 지원
- 액션 버튼 (보기, 편집, 삭제 등) 지원
- 내보내기, 컬럼 관리, 밀도 조절 기능

## 사용 방법

### 1. 동적 Import 방식 (권장)

```typescript
// 리모트 앱에서 사용 예시
import React, { useState, useEffect } from 'react';

const MyComponent = () => {
  const [components, setComponents] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadComponents = async () => {
      try {
        // 공통 컴포넌트들을 동적으로 로드
        const { ArboristTree, DataGrid, defaultActionButtons } = 
          await import('host_service/CommonComponents');
        
        setComponents({ ArboristTree, DataGrid, defaultActionButtons });
      } catch (error) {
        console.error('Failed to load common components:', error);
      } finally {
        setLoading(false);
      }
    };

    loadComponents();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!components) return <div>Error loading components</div>;

  const { ArboristTree, DataGrid, defaultActionButtons } = components;

  return (
    <div>
      {/* ArboristTree 사용 예시 */}
      <ArboristTree
        data={treeData}
        onNodeSelect={(node) => console.log('Selected:', node)}
        showIcons={true}
        multiSelect={false}
      />

      {/* DataGrid 사용 예시 */}
      <DataGrid
        rows={gridData}
        columns={columns}
        showActions={true}
        actionButtons={[
          defaultActionButtons.view((row) => alert(`View: ${row.name}`)),
          defaultActionButtons.edit((row) => alert(`Edit: ${row.name}`)),
          defaultActionButtons.delete((row) => alert(`Delete: ${row.name}`)),
        ]}
      />
    </div>
  );
};
```

### 2. 개별 컴포넌트 Import 방식

```typescript
// 개별 컴포넌트를 로드하는 방법
const ArboristTree = await import('host_service/ArboristTree');
const DataGrid = await import('host_service/DataGrid');

// 사용
<ArboristTree.default data={treeData} />
<DataGrid.default rows={gridData} columns={columns} />
```

## 컴포넌트 Props

### ArboristTree Props

```typescript
interface ArboristTreeProps {
  data: TreeNode[];                    // 트리 데이터
  onNodeSelect?: (node: TreeNode) => void;  // 노드 선택 핸들러
  onNodeExpand?: (nodeId: string) => void;  // 노드 확장 핸들러
  onNodeCollapse?: (nodeId: string) => void; // 노드 축소 핸들러
  defaultExpanded?: string[];          // 기본 확장된 노드들
  defaultSelected?: string;            // 기본 선택된 노드
  multiSelect?: boolean;               // 다중 선택 여부
  showIcons?: boolean;                 // 아이콘 표시 여부
  className?: string;                  // CSS 클래스
}
```

### DataGrid Props

```typescript
interface DataGridProps {
  rows: DataGridRow[];                 // 그리드 데이터
  columns: GridColDef[];               // 컬럼 정의
  loading?: boolean;                   // 로딩 상태
  error?: string | null;               // 에러 메시지
  
  // 선택 관련
  selectionModel?: GridRowSelectionModel;
  onSelectionModelChange?: (selectionModel: GridRowSelectionModel) => void;
  checkboxSelection?: boolean;
  
  // 페이지네이션
  pagination?: boolean;
  paginationModel?: GridPaginationModel;
  onPaginationModelChange?: (model: GridPaginationModel) => void;
  
  // 정렬
  sortingMode?: 'client' | 'server';
  sortModel?: GridSortModel;
  onSortModelChange?: (model: GridSortModel) => void;
  
  // 필터링
  filterMode?: 'client' | 'server';
  filterModel?: GridFilterModel;
  onFilterModelChange?: (model: GridFilterModel) => void;
  
  // 액션 버튼
  actionButtons?: ActionButton[];
  showActions?: boolean;
  
  // 툴바
  showToolbar?: boolean;
  showExport?: boolean;
  showFilter?: boolean;
  showColumns?: boolean;
  showDensity?: boolean;
  showRefresh?: boolean;
  showAdd?: boolean;
  onRefresh?: () => void;
  onAdd?: () => void;
  
  // 스타일링
  height?: number | string;
  width?: number | string;
  className?: string;
}
```

## 데이터 구조

### TreeNode 구조

```typescript
interface TreeNode {
  id: string;                          // 고유 ID
  name: string;                        // 표시될 이름
  type: 'folder' | 'file';             // 노드 타입
  children?: TreeNode[];               // 자식 노드들
  data?: Record<string, unknown>;      // 추가 데이터
}
```

### DataGridRow 구조

```typescript
interface DataGridRow {
  id: string | number;                 // 고유 ID
  [key: string]: unknown;              // 동적 속성들
}
```

### ActionButton 구조

```typescript
interface ActionButton {
  icon: React.ReactNode;               // 아이콘
  tooltip: string;                     // 툴팁
  onClick: (row: DataGridRow) => void; // 클릭 핸들러
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  disabled?: (row: DataGridRow) => boolean; // 비활성화 조건
}
```

## 기본 액션 버튼

```typescript
// 기본 제공되는 액션 버튼들
const defaultActionButtons = {
  view: (onClick) => ({
    icon: <Visibility />,
    tooltip: '보기',
    onClick,
    color: 'info',
  }),
  edit: (onClick) => ({
    icon: <Edit />,
    tooltip: '편집',
    onClick,
    color: 'primary',
  }),
  delete: (onClick) => ({
    icon: <Delete />,
    tooltip: '삭제',
    onClick,
    color: 'error',
  }),
};
```

## 예시 데이터

### 트리 데이터 예시

```typescript
const treeData: TreeNode[] = [
  {
    id: '1',
    name: '프로젝트',
    type: 'folder',
    children: [
      {
        id: '1-1',
        name: 'src',
        type: 'folder',
        children: [
          { id: '1-1-1', name: 'components', type: 'folder' },
          { id: '1-1-2', name: 'pages', type: 'folder' },
          { id: '1-1-3', name: 'utils', type: 'folder' },
        ],
      },
      { id: '1-2', name: 'package.json', type: 'file' },
    ],
  },
];
```

### 그리드 데이터 예시

```typescript
const gridData: DataGridRow[] = [
  { id: 1, name: '김철수', email: 'kim@example.com', role: '관리자' },
  { id: 2, name: '이영희', email: 'lee@example.com', role: '사용자' },
];

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: '이름', width: 150 },
  { field: 'email', headerName: '이메일', width: 200 },
  { field: 'role', headerName: '역할', width: 120 },
];
```

## 주의사항

1. **타입 안전성**: Module Federation에서는 타입이 제대로 전달되지 않을 수 있으므로, 런타임에서 타입 체크를 추가하는 것이 좋습니다.

2. **에러 처리**: 동적 import는 실패할 수 있으므로 적절한 에러 처리가 필요합니다.

3. **성능**: 컴포넌트가 큰 경우 로딩 시간이 걸릴 수 있으므로 로딩 상태를 표시하는 것이 좋습니다.

4. **버전 호환성**: host-service와 리모트 앱 간의 React 버전이 호환되어야 합니다.

## 데모 페이지

host-service의 `/common-components` 경로에서 실제 사용 예시를 확인할 수 있습니다. 