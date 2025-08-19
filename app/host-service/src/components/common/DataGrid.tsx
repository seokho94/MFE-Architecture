import React, { useMemo } from 'react';
import {
  DataGrid as MuiDataGrid,
  GridColDef,
  GridRowSelectionModel,
  GridPaginationModel,
  GridSortModel,
  GridFilterModel,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Refresh,
  Add,
  Edit,
  Delete,
  Visibility,
} from '@mui/icons-material';

// 데이터 그리드 행 인터페이스
export interface DataGridRow {
  id: string | number;
  [key: string]: unknown;
}

// 액션 버튼 인터페이스
export interface ActionButton {
  icon: React.ReactNode;
  tooltip: string;
  onClick: (row: DataGridRow) => void;
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  disabled?: (row: DataGridRow) => boolean;
}

// DataGrid 컴포넌트 Props
export interface DataGridProps {
  rows: DataGridRow[];
  columns: GridColDef[];
  loading?: boolean;
  error?: string | null;
  
  // 선택 관련
  selectionModel?: GridRowSelectionModel;
  onSelectionModelChange?: (selectionModel: GridRowSelectionModel) => void;
  checkboxSelection?: boolean;
  disableSelectionOnClick?: boolean;
  
  // 페이지네이션
  pagination?: boolean;
  paginationModel?: GridPaginationModel;
  onPaginationModelChange?: (model: GridPaginationModel) => void;
  pageSizeOptions?: number[];
  
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
  
  // 기타
  density?: 'compact' | 'standard' | 'comfortable';
  disableColumnMenu?: boolean;
  disableColumnFilter?: boolean;
  disableColumnSelector?: boolean;
  disableDensitySelector?: boolean;
  disableRowSelectionOnClick?: boolean;
}

// 커스텀 툴바 컴포넌트
const CustomToolbar: React.FC<{
  showExport?: boolean;
  showFilter?: boolean;
  showColumns?: boolean;
  showDensity?: boolean;
  showRefresh?: boolean;
  showAdd?: boolean;
  onRefresh?: () => void;
  onAdd?: () => void;
}> = ({
  showExport = true,
  showFilter = true,
  showColumns = true,
  showDensity = true,
  showRefresh = false,
  showAdd = false,
  onRefresh,
  onAdd,
}) => {
  return (
    <GridToolbarContainer sx={{ padding: 1, gap: 1 }}>
      {showAdd && (
        <Tooltip title="추가">
          <IconButton onClick={onAdd} color="primary">
            <Add />
          </IconButton>
        </Tooltip>
      )}
      
      {showRefresh && (
        <Tooltip title="새로고침">
          <IconButton onClick={onRefresh} color="primary">
            <Refresh />
          </IconButton>
        </Tooltip>
      )}
      
      {showFilter && <GridToolbarFilterButton />}
      {showColumns && <GridToolbarColumnsButton />}
      {showDensity && <GridToolbarDensitySelector />}
      {showExport && <GridToolbarExport />}
    </GridToolbarContainer>
  );
};

// 액션 컬럼 렌더러
const ActionCell: React.FC<{
  row: DataGridRow;
  actionButtons: ActionButton[];
}> = ({ row, actionButtons }) => {
  return (
    <Box sx={{ display: 'flex', gap: 0.5 }}>
      {actionButtons.map((action, index) => {
        const isDisabled = action.disabled ? action.disabled(row) : false;
        return (
          <Tooltip key={index} title={action.tooltip}>
            <IconButton
              size="small"
              onClick={() => action.onClick(row)}
              disabled={isDisabled}
              color={action.color || 'primary'}
            >
              {action.icon}
            </IconButton>
          </Tooltip>
        );
      })}
    </Box>
  );
};

// 메인 DataGrid 컴포넌트
export const DataGrid: React.FC<DataGridProps> = ({
  rows,
  columns,
  loading = false,
  error = null,
  
  // 선택 관련
  selectionModel,
  onSelectionModelChange,
  checkboxSelection = false,
  disableSelectionOnClick = false,
  
  // 페이지네이션
  pagination = true,
  paginationModel,
  onPaginationModelChange,
  pageSizeOptions = [10, 25, 50, 100],
  
  // 정렬
  sortingMode = 'client',
  sortModel,
  onSortModelChange,
  
  // 필터링
  filterMode = 'client',
  filterModel,
  onFilterModelChange,
  
  // 액션 버튼
  actionButtons = [],
  showActions = false,
  
  // 툴바
  showToolbar = true,
  showExport = true,
  showFilter = true,
  showColumns = true,
  showDensity = true,
  showRefresh = false,
  showAdd = false,
  onRefresh,
  onAdd,
  
  // 스타일링
  height = 400,
  width = '100%',
  className,
  
  // 기타
  density = 'standard',
  disableColumnMenu = false,
  disableColumnFilter = false,
  disableColumnSelector = false,
  disableDensitySelector = false,
  disableRowSelectionOnClick = false,
}) => {
  // 액션 컬럼 추가
  const finalColumns = useMemo(() => {
    if (showActions && actionButtons.length > 0) {
      const actionColumn: GridColDef = {
        field: 'actions',
        headerName: '액션',
        sortable: false,
        filterable: false,
        width: actionButtons.length * 50 + 20,
        renderCell: (params: { row: DataGridRow }) => (
          <ActionCell row={params.row} actionButtons={actionButtons} />
        ),
      };
      return [...columns, actionColumn];
    }
    return columns;
  }, [columns, showActions, actionButtons]);

  // 에러 상태 처리
  if (error) {
    return (
      <Paper sx={{ p: 2, textAlign: 'center' }}>
        <Typography color="error" variant="h6">
          오류가 발생했습니다
        </Typography>
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      </Paper>
    );
  }

  return (
    <Box
      className={className}
      sx={{
        height,
        width,
        '& .MuiDataGrid-root': {
          border: 'none',
        },
        '& .MuiDataGrid-cell': {
          borderBottom: '1px solid #e0e0e0',
        },
        '& .MuiDataGrid-columnHeaders': {
          backgroundColor: '#f5f5f5',
          borderBottom: '2px solid #e0e0e0',
        },
        '& .MuiDataGrid-virtualScroller': {
          backgroundColor: '#ffffff',
        },
        '& .MuiDataGrid-footerContainer': {
          borderTop: '2px solid #e0e0e0',
          backgroundColor: '#f5f5f5',
        },
      }}
    >
      <MuiDataGrid
        rows={rows}
        columns={finalColumns}
        loading={loading}
        
        // 선택 관련
        checkboxSelection={checkboxSelection}
        disableSelectionOnClick={disableSelectionOnClick || disableRowSelectionOnClick}
        selectionModel={selectionModel}
        onRowSelectionModelChange={onSelectionModelChange}
        
        // 페이지네이션
        pagination={pagination}
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationModelChange}
        pageSizeOptions={pageSizeOptions}
        
        // 정렬
        sortingMode={sortingMode}
        sortModel={sortModel}
        onSortModelChange={onSortModelChange}
        
        // 필터링
        filterMode={filterMode}
        filterModel={filterModel}
        onFilterModelChange={onFilterModelChange}
        
        // 툴바
        slots={{
          toolbar: showToolbar ? CustomToolbar : undefined,
        }}
        slotProps={{
          toolbar: {
            showExport,
            showFilter,
            showColumns,
            showDensity,
            showRefresh,
            showAdd,
            onRefresh,
            onAdd,
          },
        }}
        
        // 기타 설정
        density={density}
        disableColumnMenu={disableColumnMenu}
        disableColumnFilter={disableColumnFilter}
        disableColumnSelector={disableColumnSelector}
        disableDensitySelector={disableDensitySelector}
        
        // 스타일링
        sx={{
          '& .MuiDataGrid-cell:focus': {
            outline: 'none',
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: '#f5f5f5',
          },
        }}
      />
    </Box>
  );
};

// 기본 액션 버튼들
export const defaultActionButtons = {
  view: (onClick: (row: DataGridRow) => void): ActionButton => ({
    icon: <Visibility />,
    tooltip: '보기',
    onClick,
    color: 'info',
  }),
  edit: (onClick: (row: DataGridRow) => void): ActionButton => ({
    icon: <Edit />,
    tooltip: '편집',
    onClick,
    color: 'primary',
  }),
  delete: (onClick: (row: DataGridRow) => void): ActionButton => ({
    icon: <Delete />,
    tooltip: '삭제',
    onClick,
    color: 'error',
  }),
};

export default DataGrid; 