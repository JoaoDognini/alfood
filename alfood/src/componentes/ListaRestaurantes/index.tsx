import { useEffect, useState } from 'react';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import axios from 'axios';
import { IPaginacao } from '../../interfaces/IPaginacao';

const ListaRestaurantes = () => {
	const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
	const [proximaPagina, setProximaPagina] = useState('');
	const [paginaAnterior, setPaginaAnterior] = useState('');

	useEffect(() => {
		carregaRestaurantes('http://localhost:8000/api/v1/restaurantes/')
	}, [])

	function carregaRestaurantes(url: string) {
		axios.get<IPaginacao<IRestaurante>>(url)
			.then(response => {
				setProximaPagina(response.data.next)
				setPaginaAnterior(response.data.previous)
				setRestaurantes(response.data.results)
			})
			.catch(erro => console.log(erro))
	}

	return (<section className={style.ListaRestaurantes}>
		<h1>Os restaurantes mais <em>bacanas</em>!</h1>
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