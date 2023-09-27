import { TextField, Button, Typography, Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import IPrato from '../../../interfaces/IPrato';
import http from '../../../http';
import ITag from '../../../interfaces/ITag';
import IRestaurante from '../../../interfaces/IRestaurante';

export default function FormularioPrato() {
	const parametros = useParams();
	const navigate = useNavigate();
	const editarOuCadastrar = parametros.id ? 'Editar' : 'Cadastrar';

	const [nomePrato, setNomePrato] = useState('');
	const [descricao, setDescricao] = useState('');
	const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
	const [restaurante, setRestaurante] = useState(0);
	const [tags, setTags] = useState<ITag[]>([]);
	const [tag, setTag] = useState('');
	const [imagem, setImagem] = useState<File | null>(null);

	useEffect(() => {
		http.get<{ tags: ITag[] }>('tags/').then(response => setTags(response.data.tags))
		http.get<IRestaurante[]>('restaurantes/').then(response => setRestaurantes(response.data))
	}, [])

	useEffect(() => {
		if (parametros.id) http.get<IPrato>(`pratos/${parametros.id}/`).then(response => { setCamposEdicao(response.data) });
	}, [parametros])

	function onSubmitForm(evento: React.FormEvent<HTMLFormElement>) {
		evento.preventDefault();

		const url = parametros.id ? `pratos/${parametros.id}/` : 'pratos/';
		const method = parametros.id ? 'PUT' : 'POST';
		const editadoOuCadastrado = parametros.id ? 'editado' : 'cadastrado';
		const formData = new FormData();

		formData.append('nome', nomePrato);
		formData.append('descricao', descricao);
		formData.append('tag', tag);
		formData.append('restaurante', restaurante.toString());
		if (!parametros.id && imagem) formData.append('imagem', imagem);

		http.request({
			url,
			method,
			headers: {
				'Content-Type': 'multipart/form-data'
			},
			data: formData
		})
			.then(() => {
				limparForm();
				alert(`Prato ${editadoOuCadastrado} com sucesso`)
				navigate('/admin/pratos')
			})
			.catch(erro => alert(erro))
	}

	function selecionarImagem(evento: React.ChangeEvent<HTMLInputElement>) {
		evento.target.files?.length ? setImagem(evento.target.files[0]) : setImagem(null);
	}

	function setCamposEdicao(prato: IPrato) {
		setNomePrato(prato.nome);
		setDescricao(prato.descricao);
		setRestaurante(prato.restaurante);
		setTag(prato.tag);
	}

	function limparForm() {
		setNomePrato('');
		setDescricao('');
		setRestaurante(0);
		setTag('');
		setImagem(null);
	}

	return (
		<>
			<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
				<Typography component="h1" variant="h6">{`${editarOuCadastrar} prato`}</Typography>
				<Box component='form' sx={{ width: '100%' }} onSubmit={(evento: React.FormEvent<HTMLFormElement>) => onSubmitForm(evento)}>
					<TextField
						label="Nome do prato"
						variant="standard"
						value={nomePrato}
						onChange={evento => setNomePrato(evento.target.value)}
						fullWidth={true}
						required
						margin='dense'
					/>
					<TextField
						label="Descrição do prato"
						variant="standard"
						value={descricao}
						onChange={evento => setDescricao(evento.target.value)}
						fullWidth={true}
						required
						margin='dense'
					/>
					<FormControl fullWidth sx={{ minWidth: 125, marginY: 2 }}>
						<InputLabel id="selectTag">Tag</InputLabel>
						<Select
							labelId="selectTag"
							label="Tag"
							value={tag}
							onChange={(evento) => setTag(evento.target.value)}
						>
							{tags.map(tag =>
								<MenuItem key={tag.id} value={tag.value}>
									{tag.value}
								</MenuItem>)}
						</Select>
					</FormControl>

					<FormControl fullWidth sx={{ minWidth: 125, marginY: 2 }}>
						<InputLabel id="selectRestaurantes">Restaurante</InputLabel>
						<Select
							labelId="selectRestaurantes"
							label="Restaurante"
							value={restaurante}
							onChange={(evento) => setRestaurante(Number(evento.target.value))}
						>
							{restaurantes.map(restaurante =>
								<MenuItem key={restaurante.id} value={restaurante.id}>
									{restaurante.nome}
								</MenuItem>)}
						</Select>
					</FormControl>

					<input type='file' onChange={evento => selecionarImagem(evento)} disabled={!!parametros.id} />
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
