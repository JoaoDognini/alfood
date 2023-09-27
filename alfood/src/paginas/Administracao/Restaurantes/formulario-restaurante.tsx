import { TextField, Button, Typography, Box } from '@mui/material'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import IRestaurante from '../../../interfaces/IRestaurante';
import http from '../../../http';

export default function FormularioRestaurante() {
	const parametros = useParams();
	const navigate = useNavigate();
	const [nomeRestaurante, setNomeRestaurante] = useState('');
	const editarOuCadastrar = parametros.id ? 'Editar' : 'Cadastrar';

	useEffect(() => {
		if (parametros.id) http.get<IRestaurante>(`restaurantes/${parametros.id}/`).then(response => setNomeRestaurante(response.data.nome));
	}, [parametros])

	function onSubmitForm(evento: React.FormEvent<HTMLFormElement>) {
		evento.preventDefault();

		if (parametros.id) {
			http.put(`restaurantes/${parametros.id}/`, {
				nome: nomeRestaurante
			}).then(() => alert('Restaurante editado com sucesso!'))
				.then(() => navigate('/admin/restaurantes'))
		} else {
			http.post('restaurantes/', {
				nome: nomeRestaurante
			}).then(() => alert('Restaurante cadastrado com sucesso!'))
				.then(() => navigate('/admin/restaurantes'));
		}

	}

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
