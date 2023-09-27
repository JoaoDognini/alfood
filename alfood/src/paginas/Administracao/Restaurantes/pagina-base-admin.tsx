import { Button, Typography, Box, AppBar, Container, Toolbar, Link, Paper } from '@mui/material';
import { Outlet, Link as RouterLink } from 'react-router-dom';

export default function PaginaBaseAdmin() {
	return (
		<>
			<AppBar position="static">
				<Container maxWidth="xl" sx={{ display: 'flex', alignItems: 'center' }}>
					<Toolbar>
						<Typography variant='h6'>
							Administração
						</Typography>
						<Box sx={{ display: 'flex', flexGrow: 1 }}>
							<Link component={RouterLink} to="/admin/restaurantes">
								<Button sx={{ marginY: 2, color: 'white' }}>
									Restaurantes
								</Button>
							</Link>
							<Link component={RouterLink} to="/admin/restaurantes/novo">
								<Button sx={{ marginY: 2, color: 'white' }}>
									Novo restaurante
								</Button>
							</Link>
							<Link component={RouterLink} to="/admin/pratos/">
								<Button sx={{ marginY: 2, color: 'white' }}>
									Pratos
								</Button>
							</Link>
							<Link component={RouterLink} to="/admin/pratos/novo">
								<Button sx={{ marginY: 2, color: 'white' }}>
									Novo prato
								</Button>
							</Link>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>

			<Box>
				<Container maxWidth='lg' sx={{ marginTop: 1 }}>
					<Paper sx={{ padding: 2 }}>
						<Outlet />
					</Paper>
				</Container>
			</Box>
		</>
	)
}
