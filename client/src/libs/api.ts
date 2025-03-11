import axios from "axios";
import type { Orcamento, Cliente, Produto } from "../types/orcamentos";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Interceptor para adicionar o token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["x-auth-token"] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Clientes
export const getClientes = () => api.get<Cliente[]>("/clientes");
export const getCliente = (id: number) => api.get<Cliente>(`/clientes/${id}`);
export const createCliente = (
  cliente: Omit<Cliente, "id" | "createdAt" | "updatedAt">
) => api.post<Cliente>("/clientes", cliente);

// Produtos
export const getProdutos = () => api.get<Produto[]>("/produtos");
export const createProduto = (
  produto: Omit<Produto, "id" | "createdAt" | "updatedAt">
) => api.post<Produto>("/produtos", produto);

// Orçamentos
export const getOrcamentos = () => api.get<Orcamento[]>("/orcamentos");
export const createOrcamento = (
  orcamento: Omit<Orcamento, "id" | "createdAt" | "updatedAt">
) => api.post<Orcamento>("/orcamentos", orcamento);
