import { TableContainer, Paper, Table, TableHead, TableBody, TableRow, TableCell, Button, Link } from "@mui/material";
import IPrato from "../../../interfaces/IPrato";
import { useEffect, useState } from 'react';
import { Link as RouterLink } from "react-router-dom";
import http from "../../../http";

export default function AdministracaoPratos() {
	const [pratos, setPratos] = useState<IPrato[]>([]);

	useEffect(() => {
		http.get('pratos/')
			.then(response => setPratos(response.data));
	}, [])

	function deletarPrato(pratoParaExcluir: IPrato) {
		http.delete(`pratos/${pratoParaExcluir.id}/`).then(() => {
			const listaPratos = pratos.filter(prato => prato.id !== pratoParaExcluir.id)
			setPratos(listaPratos);
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
						<TableCell>
							Imagem
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{pratos.map(prato =>
						<TableRow key={prato.id}>
							<TableCell>
								{prato.nome}
							</TableCell>
							<TableCell>
								{prato.descricao}
							</TableCell>
							<TableCell>
								{prato.tag}
							</TableCell>
							<TableCell>
								<a href={prato.imagem} target="_blank" rel="noreferrer">Ver imagem</a>
							</TableCell>
							<TableCell>
								<Link component={RouterLink} to={`/admin/pratos/${prato.id}`}>Editar</Link>
							</TableCell>
							<TableCell>
								<Button
									variant="outlined"
									color="error"
									onClick={() => deletarPrato(prato)}>Excluir</Button>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
