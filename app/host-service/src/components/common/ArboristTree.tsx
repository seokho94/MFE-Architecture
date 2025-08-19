import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  IconButton,
  Box,
} from '@mui/material';
import {
  ExpandLess,
  ChevronRight,
  Folder,
  InsertDriveFile,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// 트리 아이템 스타일링
const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(0.5, 1),
  borderRadius: theme.spacing(0.5),
  margin: theme.spacing(0.25, 0),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '&.selected': {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

// 트리 노드 인터페이스
export interface TreeNode {
  id: string;
  name: string;
  type: 'folder' | 'file';
  children?: TreeNode[];
  data?: Record<string, unknown>; // 추가 데이터
}

// ArboristTree 컴포넌트 Props
export interface ArboristTreeProps {
  data: TreeNode[];
  onNodeSelect?: (node: TreeNode) => void;
  onNodeExpand?: (nodeId: string) => void;
  onNodeCollapse?: (nodeId: string) => void;
  defaultExpanded?: string[];
  defaultSelected?: string;
  multiSelect?: boolean;
  showIcons?: boolean;
  className?: string;
}

// 트리 노드 컴포넌트
interface TreeNodeComponentProps {
  node: TreeNode;
  level: number;
  expanded: string[];
  selected: string | string[];
  onNodeSelect?: (node: TreeNode) => void;
  onNodeExpand?: (nodeId: string) => void;
  onNodeCollapse?: (nodeId: string) => void;
  showIcons?: boolean;
  multiSelect?: boolean;
}

const TreeNodeComponent: React.FC<TreeNodeComponentProps> = ({
  node,
  level,
  expanded,
  selected,
  onNodeSelect,
  onNodeExpand,
  onNodeCollapse,
  showIcons = true,
  multiSelect = false,
}) => {
  const isExpanded = expanded.includes(node.id);
  const isSelected = multiSelect 
    ? Array.isArray(selected) && selected.includes(node.id)
    : selected === node.id;
  const hasChildren = node.children && node.children.length > 0;

  const handleToggle = () => {
    if (hasChildren) {
      if (isExpanded) {
        onNodeCollapse?.(node.id);
      } else {
        onNodeExpand?.(node.id);
      }
    }
  };

  const handleSelect = () => {
    onNodeSelect?.(node);
  };

  return (
    <Box>
      <StyledListItem
        className={isSelected ? 'selected' : ''}
        onClick={handleSelect}
        sx={{ paddingLeft: level * 2 + 1 }}
      >
        {hasChildren && (
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              handleToggle();
            }}
            sx={{ marginRight: 1 }}
          >
            {isExpanded ? <ExpandLess /> : <ChevronRight />}
          </IconButton>
        )}
        {!hasChildren && <Box sx={{ width: 32, marginRight: 1 }} />}
        
        {showIcons && (
          <ListItemIcon sx={{ minWidth: 32 }}>
            {node.type === 'folder' ? (
              <Folder color="primary" fontSize="small" />
            ) : (
              <InsertDriveFile color="action" fontSize="small" />
            )}
          </ListItemIcon>
        )}
        
        <ListItemText primary={node.name} />
      </StyledListItem>
      
      {hasChildren && (
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {node.children!.map((child) => (
              <TreeNodeComponent
                key={child.id}
                node={child}
                level={level + 1}
                expanded={expanded}
                selected={selected}
                onNodeSelect={onNodeSelect}
                onNodeExpand={onNodeExpand}
                onNodeCollapse={onNodeCollapse}
                showIcons={showIcons}
                multiSelect={multiSelect}
              />
            ))}
          </List>
        </Collapse>
      )}
    </Box>
  );
};

// 메인 ArboristTree 컴포넌트
export const ArboristTree: React.FC<ArboristTreeProps> = ({
  data,
  onNodeSelect,
  onNodeExpand,
  onNodeCollapse,
  defaultExpanded = [],
  defaultSelected,
  multiSelect = false,
  showIcons = true,
  className,
}) => {
  const [expanded, setExpanded] = useState<string[]>(defaultExpanded);
  const [selected, setSelected] = useState<string | string[]>(
    multiSelect ? [] : defaultSelected || ''
  );

  const handleExpand = (nodeId: string) => {
    const newExpanded = [...expanded, nodeId];
    setExpanded(newExpanded);
    onNodeExpand?.(nodeId);
  };

  const handleCollapse = (nodeId: string) => {
    const newExpanded = expanded.filter(id => id !== nodeId);
    setExpanded(newExpanded);
    onNodeCollapse?.(nodeId);
  };

  const handleSelect = (node: TreeNode) => {
    if (multiSelect) {
      const currentSelected = Array.isArray(selected) ? selected : [];
      const newSelected = currentSelected.includes(node.id)
        ? currentSelected.filter(id => id !== node.id)
        : [...currentSelected, node.id];
      setSelected(newSelected);
    } else {
      setSelected(node.id);
    }
    onNodeSelect?.(node);
  };

  return (
    <List
      className={className}
      sx={{
        height: '100%',
        flexGrow: 1,
        maxWidth: '100%',
        overflowY: 'auto',
        padding: 1,
      }}
    >
      {data.map((node) => (
        <TreeNodeComponent
          key={node.id}
          node={node}
          level={0}
          expanded={expanded}
          selected={selected}
          onNodeSelect={handleSelect}
          onNodeExpand={handleExpand}
          onNodeCollapse={handleCollapse}
          showIcons={showIcons}
          multiSelect={multiSelect}
        />
      ))}
    </List>
  );
};

export default ArboristTree; 