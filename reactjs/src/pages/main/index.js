import React, { Component } from 'react';
import api from "../../services/api";
import "./styles.css";
export default class Main extends Component {
    state = {
        products: [],
        page: 1,
        pages: 1
    }
    componentDidMount() {
        this.loadProducts();    
    }

    loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`);
        this.setState({
            products: response.data.docs,
            page: parseInt(response.data.page),
            pages: parseInt(response.data.pages)
        });
    }

    prevPage = () => {
        let { page } = this.state;
        if (page > 1) {
            this.loadProducts(--page);
        }
    }

    nextPage = () => {
        let { page, pages } = this.state;
        if (page < pages) {
            this.loadProducts(++page);
        }
    }

    render() {
        const { page, pages } = this.state;
        return (
            <div>
                <div className="product-list">
                    {this.state.products.map(element => (
                        <article key={ element._id } className="product-card">
                            <h2 className="product-card__title">{ element.title }</h2>
                            <p className="product-card__description">{ element.description }</p>
                            <button className="product-card__details-button">Details</button>
                        </article>
                    ))}
                </div>
                <div className="product-list-nav">
                    <button className="product-list-nav__button" onClick={this.prevPage} disabled={page === 1}>Prev</button>
                    <button className="product-list-nav__button" onClick={this.nextPage} disabled={page === pages}>Next</button>
                </div>
            </div>
        );
    }
};
