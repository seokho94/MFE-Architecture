import React from "react";
import { Link as RouterLink, Outlet, useNavigate } from "react-router-dom";
import { menus } from "./sidebarMenu";
import {
		AppBar,
		Box,
		CssBaseline,
		Divider,
		Drawer,
		List,
		ListItem,
		ListItemButton,
		ListItemText,
		Toolbar,
		Typography,
} from '@mui/material';

const drawerWidth = 240;

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
						<ListItem key={menu.value} disablePadding>
							<ListItemButton key={menu.key} component={RouterLink} to={`/${menu.key}`}>
								<ListItemText primary={menu.value} />
							</ListItemButton>
						</ListItem>
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