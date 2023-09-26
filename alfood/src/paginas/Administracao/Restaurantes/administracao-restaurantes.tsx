import { TableContainer, Paper, Table, TableHead, TableBody, TableRow, TableCell, Button } from "@mui/material";
import IRestaurante from "../../../interfaces/IRestaurante";
import { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";

export default function AdministracaoRestaurantes() {
	const url = 'http://localhost:8000/api/v2/restaurantes/';
	const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

	useEffect(() => {
		axios.get(url)
			.then(response => setRestaurantes(response.data));
	}, [])

	function deletarRestaurante(restauranteParaExcluir: IRestaurante) {
		axios.delete(`${url}${restauranteParaExcluir.id}/`).then(() => {
			const listaRestaurantes = restaurantes.filter(restaurante => restaurante.id !== restauranteParaExcluir.id)
			setRestaurantes(listaRestaurantes);
		})
	}
	return (
		<TableContainer component={Paper}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>
							Nome
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{restaurantes.map(restaurante =>
						<TableRow key={restaurante.id}>
							<TableCell>
								{restaurante.nome}
							</TableCell>
							<TableCell>
								<Link to={`/admin/restaurantes/${restaurante.id}`}>Editar</Link>
							</TableCell>
							<TableCell>
								<Button
									variant="outlined"
									color="error"
									onClick={() => deletarRestaurante(restaurante)}>Excluir</Button>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
