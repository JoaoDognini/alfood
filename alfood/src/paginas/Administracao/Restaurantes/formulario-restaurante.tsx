import { TextField, Button } from '@mui/material'
import axios from 'axios';
import { useState } from 'react'

export default function FormularioRestaurante() {
	const [nomeRestaurante, setNomeRestaurante] = useState('')
	function onSubmitForm(evento: React.FormEvent<HTMLFormElement>) {
		evento.preventDefault();

		axios.post('http://localhost:8000/api/v2/restaurantes/', {
			nome: nomeRestaurante
		})
			.then(() => console.log('Deu boa'));
	}

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
