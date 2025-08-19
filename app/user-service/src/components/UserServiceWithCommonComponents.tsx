import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Alert,
  Button,
} from '@mui/material';
import type { TreeNode } from 'host_service/ArboristTree';
import type { DataGridRow, ActionButton } from 'host_service/DataGrid';
import type { GridColDef } from '@mui/x-data-grid';

// 동적 import를 위한 타입
interface CommonComponents {
  ArboristTree: React.ComponentType<unknown>;
  DataGrid: React.ComponentType<unknown>;
  defaultActionButtons: {
    view: (onClick: (row: DataGridRow) => void) => ActionButton;
    edit: (onClick: (row: DataGridRow) => void) => ActionButton;
    delete: (onClick: (row: DataGridRow) => void) => ActionButton;
  };
}

const UserServiceWithCommonComponents: React.FC = () => {
  const [components, setComponents] = useState<CommonComponents | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTreeNode, setSelectedTreeNode] = useState<TreeNode | null>(null);
  const [selectedGridRows, setSelectedGridRows] = useState<DataGridRow[]>([]);

  // 공통 컴포넌트 로드
  useEffect(() => {
    const loadComponents = async () => {
      try {
        setLoading(true);
        const commonComponents = await import('host_service/CommonComponents');
        setComponents(commonComponents);
        setError(null);
      } catch (err) {
        setError('공통 컴포넌트를 로드하는 중 오류가 발생했습니다.');
        console.error('Failed to load common components:', err);
      } finally {
        setLoading(false);
      }
    };

    loadComponents();
  }, []);

  // 샘플 트리 데이터
  const sampleTreeData: TreeNode[] = [
    {
      id: '1',
      name: '사용자 관리',
      type: 'folder',
      children: [
        {
          id: '1-1',
          name: '사용자 목록',
          type: 'folder',
          children: [
            { id: '1-1-1', name: '활성 사용자', type: 'file' },
            { id: '1-1-2', name: '비활성 사용자', type: 'file' },
          ],
        },
        {
          id: '1-2',
          name: '권한 관리',
          type: 'folder',
          children: [
            { id: '1-2-1', name: '관리자 권한', type: 'file' },
            { id: '1-2-2', name: '일반 사용자 권한', type: 'file' },
          ],
        },
      ],
    },
  ];

  // 샘플 그리드 데이터
  const sampleGridData: DataGridRow[] = [
    { id: 1, name: '김철수', email: 'kim@example.com', role: '관리자', status: '활성', department: 'IT팀' },
    { id: 2, name: '이영희', email: 'lee@example.com', role: '사용자', status: '활성', department: '마케팅팀' },
    { id: 3, name: '박민수', email: 'park@example.com', role: '관리자', status: '비활성', department: '개발팀' },
    { id: 4, name: '정수진', email: 'jung@example.com', role: '사용자', status: '활성', department: '디자인팀' },
    { id: 5, name: '최동욱', email: 'choi@example.com', role: '관리자', status: '활성', department: '기획팀' },
  ];

  // 그리드 컬럼 정의
  const gridColumns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: '이름', width: 120 },
    { field: 'email', headerName: '이메일', width: 180 },
    { field: 'role', headerName: '역할', width: 100 },
    { field: 'department', headerName: '부서', width: 120 },
    { field: 'status', headerName: '상태', width: 80 },
  ];

  // 트리 노드 선택 핸들러
  const handleTreeNodeSelect = (node: TreeNode) => {
    setSelectedTreeNode(node);
    console.log('선택된 트리 노드:', node);
  };

  // 그리드 행 선택 핸들러
  const handleGridRowSelect = (rows: DataGridRow[]) => {
    setSelectedGridRows(rows);
    console.log('선택된 그리드 행:', rows);
  };

  // 액션 버튼 핸들러들
  const handleView = (row: DataGridRow) => {
    alert(`사용자 보기: ${row.name}`);
  };

  const handleEdit = (row: DataGridRow) => {
    alert(`사용자 편집: ${row.name}`);
  };

  const handleDelete = (row: DataGridRow) => {
    if (confirm(`${row.name} 사용자를 삭제하시겠습니까?`)) {
      alert(`${row.name} 사용자 삭제됨`);
    }
  };

  if (loading) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography>공통 컴포넌트를 로드하는 중...</Typography>
      </Box>
    );
  }

  if (error || !components) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error || '알 수 없는 오류가 발생했습니다.'}
        </Alert>
        <Button 
          variant="contained" 
          onClick={() => window.location.reload()}
        >
          다시 시도
        </Button>
      </Box>
    );
  }

  const { ArboristTree, DataGrid, defaultActionButtons } = components;

  // 액션 버튼 설정
  const actionButtons = [
    defaultActionButtons.view(handleView),
    defaultActionButtons.edit(handleEdit),
    defaultActionButtons.delete(handleDelete),
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        User Service - 공통 컴포넌트 사용 예시
      </Typography>
      
      <Alert severity="info" sx={{ mb: 3 }}>
        이 페이지는 user-service에서 host-service의 공통 컴포넌트를 동적으로 로드하여 사용하는 예시입니다.
      </Alert>

      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
        {/* Arborist Tree 데모 */}
        <Box sx={{ flex: '1 1 400px', minWidth: 0 }}>
          <Card>
            <CardHeader title="사용자 관리 트리" />
            <CardContent>
              <Box sx={{ height: 400, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                <ArboristTree
                  data={sampleTreeData}
                  onNodeSelect={handleTreeNodeSelect}
                  defaultExpanded={['1', '1-1']}
                  showIcons={true}
                  multiSelect={false}
                />
              </Box>
              {selectedTreeNode && (
                <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                  <Typography variant="subtitle2">선택된 노드:</Typography>
                  <Typography variant="body2">
                    {selectedTreeNode.name} ({selectedTreeNode.type})
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>

        {/* Data Grid 데모 */}
        <Box sx={{ flex: '1 1 400px', minWidth: 0 }}>
          <Card>
            <CardHeader title="사용자 목록" />
            <CardContent>
              <DataGrid
                rows={sampleGridData}
                columns={gridColumns}
                height={400}
                checkboxSelection={true}
                showActions={true}
                actionButtons={actionButtons}
                showToolbar={true}
                showExport={true}
                showFilter={true}
                showColumns={true}
                showDensity={true}
                showAdd={true}
                showRefresh={true}
                onAdd={() => alert('새 사용자 추가')}
                onRefresh={() => alert('사용자 목록 새로고침')}
                onSelectionModelChange={(selection) => {
                  const selectedRows = sampleGridData.filter(row => 
                    selection.includes(row.id)
                  );
                  handleGridRowSelect(selectedRows);
                }}
              />
              {selectedGridRows.length > 0 && (
                <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                  <Typography variant="subtitle2">
                    선택된 사용자: {selectedGridRows.length}명
                  </Typography>
                  {selectedGridRows.map((row, index) => (
                    <Typography key={index} variant="body2">
                      {String(row.name)} ({String(row.email)}) - {String(row.department)}
                    </Typography>
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* 구현 설명 */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          구현 방법
        </Typography>
        
        <Typography variant="body1" paragraph>
          이 페이지는 Module Federation을 사용하여 host-service의 공통 컴포넌트를 동적으로 로드합니다.
        </Typography>
        
        <Box component="pre" sx={{ 
          bgcolor: 'grey.100', 
          p: 2, 
          borderRadius: 1, 
          overflow: 'auto',
          fontSize: '0.875rem'
        }}>
{`// 1. 동적 import로 공통 컴포넌트 로드
const commonComponents = await import('host_service/CommonComponents');

// 2. 컴포넌트 추출
const { ArboristTree, DataGrid, defaultActionButtons } = commonComponents;

// 3. 일반적인 React 컴포넌트처럼 사용
<ArboristTree data={treeData} onNodeSelect={handleSelect} />
<DataGrid rows={gridData} columns={columns} />`}
        </Box>
      </Paper>
    </Box>
  );
};

export default UserServiceWithCommonComponents; 