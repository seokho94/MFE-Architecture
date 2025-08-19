import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Alert,
} from '@mui/material';
import { ArboristTree } from '../components/common/ArboristTree';
import type { TreeNode } from '../components/common/ArboristTree';
import { DataGrid, defaultActionButtons } from '../components/common/DataGrid';
import type { DataGridRow } from '../components/common/DataGrid';
import type { GridColDef } from '@mui/x-data-grid';

// 샘플 트리 데이터
const sampleTreeData: TreeNode[] = [
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
      {
        id: '1-2',
        name: 'public',
        type: 'folder',
        children: [
          { id: '1-2-1', name: 'index.html', type: 'file' },
          { id: '1-2-2', name: 'favicon.ico', type: 'file' },
        ],
      },
      { id: '1-3', name: 'package.json', type: 'file' },
      { id: '1-4', name: 'README.md', type: 'file' },
    ],
  },
];

// 샘플 그리드 데이터
const sampleGridData: DataGridRow[] = [
  { id: 1, name: '김철수', email: 'kim@example.com', role: '관리자', status: '활성' },
  { id: 2, name: '이영희', email: 'lee@example.com', role: '사용자', status: '활성' },
  { id: 3, name: '박민수', email: 'park@example.com', role: '관리자', status: '비활성' },
  { id: 4, name: '정수진', email: 'jung@example.com', role: '사용자', status: '활성' },
  { id: 5, name: '최동욱', email: 'choi@example.com', role: '관리자', status: '활성' },
];

// 그리드 컬럼 정의
const gridColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: '이름', width: 150 },
  { field: 'email', headerName: '이메일', width: 200 },
  { field: 'role', headerName: '역할', width: 120 },
  { field: 'status', headerName: '상태', width: 100 },
];

const CommonComponentsDemo: React.FC = () => {
  const [selectedTreeNode, setSelectedTreeNode] = useState<TreeNode | null>(null);
  const [selectedGridRows, setSelectedGridRows] = useState<DataGridRow[]>([]);

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
    alert(`보기: ${row.name}`);
  };

  const handleEdit = (row: DataGridRow) => {
    alert(`편집: ${row.name}`);
  };

  const handleDelete = (row: DataGridRow) => {
    if (confirm(`${row.name}을(를) 삭제하시겠습니까?`)) {
      alert(`${row.name} 삭제됨`);
    }
  };

  // 액션 버튼 설정
  const actionButtons = [
    defaultActionButtons.view(handleView),
    defaultActionButtons.edit(handleEdit),
    defaultActionButtons.delete(handleDelete),
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        공통 컴포넌트 데모
      </Typography>
      
      <Alert severity="info" sx={{ mb: 3 }}>
        이 페이지는 host-service에서 제공하는 공통 컴포넌트들의 사용 예시를 보여줍니다.
        리모트 앱에서도 동일한 방식으로 사용할 수 있습니다.
      </Alert>

      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
        {/* Arborist Tree 데모 */}
        <Box sx={{ flex: '1 1 400px', minWidth: 0 }}>
          <Card>
            <CardHeader title="Arborist Tree 컴포넌트" />
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
            <CardHeader title="Data Grid 컴포넌트" />
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
                onAdd={() => alert('새 항목 추가')}
                onRefresh={() => alert('데이터 새로고침')}
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
                    선택된 행: {selectedGridRows.length}개
                  </Typography>
                  {selectedGridRows.map((row, index) => (
                    <Typography key={index} variant="body2">
                      {String(row.name)} ({String(row.email)})
                    </Typography>
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* 사용법 가이드 */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          사용법 가이드
        </Typography>
        
        <Typography variant="subtitle1" gutterBottom>
          리모트 앱에서 사용하는 방법:
        </Typography>
        
        <Box component="pre" sx={{ 
          bgcolor: 'grey.100', 
          p: 2, 
          borderRadius: 1, 
          overflow: 'auto',
          fontSize: '0.875rem'
        }}>
{`// 1. 동적 import로 컴포넌트 가져오기
const { ArboristTree, DataGrid } = await import('host_service/CommonComponents');

// 2. 또는 개별 컴포넌트 가져오기
const ArboristTree = await import('host_service/ArboristTree');
const DataGrid = await import('host_service/DataGrid');

// 3. 사용 예시
<ArboristTree
  data={treeData}
  onNodeSelect={handleSelect}
  showIcons={true}
/>

<DataGrid
  rows={gridData}
  columns={columns}
  showActions={true}
  actionButtons={actionButtons}
/>`}
        </Box>
      </Paper>
    </Box>
  );
};

export default CommonComponentsDemo; 