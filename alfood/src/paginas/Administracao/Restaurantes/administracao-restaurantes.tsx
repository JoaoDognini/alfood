import { TableContainer, Paper, Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";
import IRestaurante from "../../../interfaces/IRestaurante";
import { useEffect, useState } from 'react';
import axios from "axios";

export default function AdministracaoRestaurantes() {
	const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

	useEffect(() => {
		axios.get('http://localhost:8000/api/v2/restaurantes/')
			.then(response => setRestaurantes(response.data));
	}, [])

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
						</TableRow>
					)}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
