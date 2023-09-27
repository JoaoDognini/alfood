import { Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';
import AdministracaoRestaurantes from './paginas/Administracao/Restaurantes/administracao-restaurantes';
import FormularioRestaurante from './paginas/Administracao/Restaurantes/formulario-restaurante';
import PaginaBaseAdmin from './paginas/Administracao/Restaurantes/pagina-base-admin';
import AdministracaoPratos from './paginas/Administracao/Pratos/administracao-pratos';
import FormularioPrato from './paginas/Administracao/Pratos/formulario-prato';

function App() {

	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/restaurantes" element={<VitrineRestaurantes />} />

			<Route path='/admin' element={<PaginaBaseAdmin />}>
				<Route path="/admin/restaurantes" element={<AdministracaoRestaurantes />} />
				<Route path="/admin/restaurantes/novo" element={<FormularioRestaurante />} />
				<Route path="/admin/restaurantes/:id" element={<FormularioRestaurante />} />

				<Route path="/admin/pratos" element={<AdministracaoPratos />} />
				<Route path="/admin/pratos/novo" element={<FormularioPrato />} />
				<Route path="/admin/pratos/:id" element={<FormularioPrato />} />
			</Route>
		</Routes>
	);
}

export default App;
