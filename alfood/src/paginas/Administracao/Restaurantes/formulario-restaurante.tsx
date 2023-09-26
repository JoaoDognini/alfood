import { TextField, Button, Typography, Box } from '@mui/material'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import IRestaurante from '../../../interfaces/IRestaurante';
import http from '../../../http';

export default function FormularioRestaurante() {
	const parametros = useParams();
	const editarOuCadastrar = parametros.id ? 'Editar' : 'Cadastrar';

	const [nomeRestaurante, setNomeRestaurante] = useState('')

	function onSubmitForm(evento: React.FormEvent<HTMLFormElement>) {
		evento.preventDefault();

		if (parametros.id) {
			http.put(`restaurantes/${parametros.id}/`, {
				nome: nomeRestaurante
			}).then(() => console.log('Restaurante editado com sucesso!'));
		} else {
			http.post('restaurantes/', {
				nome: nomeRestaurante
			}).then(() => console.log('Restaurante cadastrado com sucesso!'));
		}
	}

	useEffect(() => {
		console.log(parametros.id)
		if (parametros.id) http.get<IRestaurante>(`restaurantes/${parametros.id}/`).then(response => setNomeRestaurante(response.data.nome));
	}, [parametros])

	return (
		<>
			<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
				<Typography component="h1" variant="h6">{`${editarOuCadastrar} restaurante`}</Typography>
				<Box component='form' sx={{ width: '100%' }} onSubmit={(evento: React.FormEvent<HTMLFormElement>) => onSubmitForm(evento)}>
					<TextField
						label="Nome do restaurante"
						variant="standard"
						value={nomeRestaurante}
						onChange={evento => setNomeRestaurante(evento.target.value)}
						fullWidth={true}
						required
					/>
					<Button
						sx={{ marginTop: 1 }}
						variant="outlined"
						type='submit'
						fullWidth={true}
					>
						Salvar
					</Button>
				</Box>
			</Box>
		</>
	)
}
