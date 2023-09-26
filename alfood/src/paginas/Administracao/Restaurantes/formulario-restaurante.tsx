import { TextField, Button } from '@mui/material'
import axios from 'axios';
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import IRestaurante from '../../../interfaces/IRestaurante';

export default function FormularioRestaurante() {
	const url = 'http://localhost:8000/api/v2/restaurantes/';
	const parametros = useParams();

	const [nomeRestaurante, setNomeRestaurante] = useState('')

	function onSubmitForm(evento: React.FormEvent<HTMLFormElement>) {
		evento.preventDefault();

		if (parametros.id) {
			axios.put(`${url}${parametros.id}/`, {
				nome: nomeRestaurante
			})
				.then(() => console.log('Restaurante editado com sucesso!'));
		} else {
			axios.post(url, {
				nome: nomeRestaurante
			})
				.then(() => console.log('Restaurante cadastrado com sucesso!'));
		}
	}

	useEffect(() => {
		console.log(parametros.id)
		if (parametros.id) axios.get<IRestaurante>(`${url}${parametros.id}/`).then(response => setNomeRestaurante(response.data.nome));
	}, [parametros])

	return (
		<form onSubmit={evento => onSubmitForm(evento)}>
			<TextField
				label="Nome do restaurante"
				variant="standard"
				value={nomeRestaurante}
				onChange={evento => setNomeRestaurante(evento.target.value)}
			/>
			<Button
				variant="outlined"
				type='submit'>
				Salvar
			</Button>
		</form>
	)
}
