export interface MenuItem {
  key: string;
  value: string;
  children?: MenuItem[];
}

export const menus: MenuItem[] = [
	{
		key: '',
		value: '홈',
	},
	{
		key: 'users',
		value: '사용자관리',
		children: [
			{
				key: 'users/service',
				value: '사용자 목록',
			},
			{
				key: 'users/test',
				value: '사용자 테스트',
			},
		],
	},
	{
		key: 'authorities',
		value: '인증관리',
	},
	{
		key: 'notis',
		value: '알림관리',
	},
];