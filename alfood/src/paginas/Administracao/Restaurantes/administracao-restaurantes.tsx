import { TableContainer, Paper, Table, TableHead, TableBody, TableRow, TableCell, Button, Link } from "@mui/material";
import IRestaurante from "../../../interfaces/IRestaurante";
import { useEffect, useState } from 'react';
import { Link as RouterLink } from "react-router-dom";
import http from "../../../http";

export default function AdministracaoRestaurantes() {
	const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

	useEffect(() => {
		http.get('restaurantes/')
			.then(response => setRestaurantes(response.data));
	}, [])

	function deletarRestaurante(restauranteParaExcluir: IRestaurante) {
		http.delete(`restaurantes/${restauranteParaExcluir.id}/`).then(() => {
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
						<TableCell>
							Descrição
						</TableCell>
						<TableCell>
							Tag
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
								<Link component={RouterLink} to={`/admin/restaurantes/${restaurante.id}`}>Editar</Link>
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
