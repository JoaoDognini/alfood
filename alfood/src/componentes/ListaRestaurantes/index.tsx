import { useEffect, useState } from 'react';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import axios, { AxiosRequestConfig } from 'axios';
import { IPaginacao } from '../../interfaces/IPaginacao';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

interface IParametrosBusca {
	ordering?: string
	search?: string
}

const ListaRestaurantes = () => {
	const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
	const [proximaPagina, setProximaPagina] = useState('');
	const [paginaAnterior, setPaginaAnterior] = useState('');
	const [pesquisa, setPesquisa] = useState('');
	const [ordenacao, setOrdenacao] = useState('');

	useEffect(() => {
		carregaRestaurantes('http://localhost:8000/api/v1/restaurantes/');

	}, [])

	function carregaRestaurantes(url: string, opcoes: AxiosRequestConfig = {}) {
		axios.get<IPaginacao<IRestaurante>>(url, opcoes)
			.then(response => {
				setProximaPagina(response.data.next)
				setPaginaAnterior(response.data.previous)
				setRestaurantes(response.data.results)
			})
			.catch(erro => alert(erro))
	}

	function buscar(evento: React.FormEvent<HTMLFormElement>) {
		evento.preventDefault();
		const opcoes = {
			params: {} as IParametrosBusca
		}

		if (pesquisa) opcoes.params.search = pesquisa

		if (ordenacao) opcoes.params.ordering = ordenacao;

		carregaRestaurantes('http://localhost:8000/api/v1/restaurantes/', opcoes)
	}

	return (<section className={style.ListaRestaurantes}>
		<h1>Os restaurantes mais <em>bacanas</em>!</h1>
		<form onSubmit={evento => buscar(evento)}>
			<div className={style.Pesquisa}>
				<div>
					<TextField
						id="outlined-basic"
						variant="outlined"
						label="Pesquisar"
						value={pesquisa}
						onChange={(evento) => setPesquisa(evento.target.value)}
					/>
				</div>
				<div>
					<FormControl fullWidth sx={{minWidth: 125}}>
						<InputLabel id="ordenacao">Ordenação</InputLabel>
						<Select
							labelId="ordenar"
							id="ordem"
							label="Ordenar"
							value={ordenacao}
							onChange={(evento) => setOrdenacao(evento.target.value)}
						>
							<MenuItem value=''>Padrão</MenuItem>
							<MenuItem value='id'>Por ID</MenuItem>
							<MenuItem value='nome'>Por Nome</MenuItem>
						</Select>
					</FormControl>
				</div>
				<Button type='submit'>Buscar</Button>
			</div>
		</form>
		{restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
		{
			<button onClick={() => carregaRestaurantes(paginaAnterior)} disabled={!paginaAnterior}>
				Anterior
			</button>
		}
		{
			<button onClick={() => carregaRestaurantes(proximaPagina)} disabled={!proximaPagina}>
				Próxima
			</button>
		}

	</section>)
}

export default ListaRestaurantes