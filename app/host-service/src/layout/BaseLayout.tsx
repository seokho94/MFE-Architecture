import React, { useState } from "react";
import { Link as RouterLink, Outlet, useLocation } from "react-router-dom";
import { menus } from "./sidebarMenu";
import type { MenuItem } from "./sidebarMenu";
import {
		AppBar,
		Box,
		CssBaseline,
		Collapse,
		Divider,
		Drawer,
		List,
		ListItem,
		ListItemButton,
		ListItemText,
		Toolbar,
		Typography,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const drawerWidth = 240;

const MenuItemComponent = ({ menu, level = 0 }: { menu: MenuItem; level?: number }) => {
	const location = useLocation();
	const hasChildren = menu.children && menu.children.length > 0;
	const isActive = location.pathname === `/${menu.key}`;
	const isParentActive = hasChildren && menu.children?.some((child: MenuItem) => location.pathname === `/${child.key}`);
	
	const [open, setOpen] = useState(hasChildren);

	const handleClick = () => {
		if (hasChildren) {
			setOpen(!open);
		}
	};

	return (
		<>
			<ListItem disablePadding>
				<ListItemButton
					component={hasChildren ? 'div' : RouterLink}
					to={hasChildren ? undefined : `/${menu.key}`}
					onClick={handleClick}
					sx={{
						pl: level * 3 + 2,
						pr: 2,
						py: level === 0 ? 1.5 : 1,
						backgroundColor: isActive || isParentActive ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
						borderLeft: level > 0 ? `3px solid ${isActive ? '#1976d2' : 'rgba(0, 0, 0, 0.12)'}` : 'none',
						'&:hover': {
							backgroundColor: 'rgba(25, 118, 210, 0.04)',
						},
					}}
				>
					<ListItemText 
						primary={menu.value}
						sx={{
							'& .MuiListItemText-primary': {
								fontWeight: isActive || isParentActive ? 'bold' : 'normal',
								color: isActive || isParentActive ? '#1976d2' : 'inherit',
								fontSize: level === 0 ? '1rem' : '0.9rem',
							},
						}}
					/>
					{hasChildren && (open ? <ExpandLess /> : <ExpandMore />)}
				</ListItemButton>
			</ListItem>
			{hasChildren && (
				<Collapse in={open} timeout="auto" unmountOnExit>
					<List component="div" disablePadding sx={{ 
						borderLeft: level === 0 ? '1px solid rgba(0, 0, 0, 0.08)' : 'none',
						ml: level === 0 ? 2 : 0,
					}}>
						{menu.children?.map((child: MenuItem) => (
							<MenuItemComponent key={child.key} menu={child} level={level + 1} />
						))}
					</List>
				</Collapse>
			)}
		</>
	);
};

const BaseLayout = () => {
	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			{/* 상단 App bar */}
			<AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
				<Toolbar>
					<Typography variant="h6" noWrap component="div">
						 사이드바 레이아웃 웹
					</Typography>
				</Toolbar>
			</AppBar>

			{/* 좌측 사이드바 Drawer */}
			<Drawer
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					[`& .MuiDrawer-paper`]: {
						width: drawerWidth,
						boxSizing: 'border-box',
					},
				}}
				variant="permanent"
				anchor="left"
			>
				<Toolbar />
				<Divider />
				<List>
					{menus.map((menu) => (
						<MenuItemComponent key={menu.key} menu={menu} />
					))}
				</List>
			</Drawer>

			{/* 메인 컨텐츠 영역 */}
			<Box component="main" sx={{ flexGrow: 1, p: 3, marginLeft: `${drawerWidth}px - 200px` }}>
				<Toolbar />
				<Box sx={{ display: 'flex', justifyContent: 'flex-start', width: '100%', paddingLeft: 0 }}>
					<Outlet />
				</Box>
			</Box>
		</Box>
	);
}

export default BaseLayout;