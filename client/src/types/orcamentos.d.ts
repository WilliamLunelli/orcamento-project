// src/types/orcamento.d.ts
export interface Cliente {
  id: number;
  nome: string;
  email?: string;
  telefone?: string;
  cpf?: string;
  cnpj?: string;
  tipo: "PF" | "PJ";
  createdAt: Date;
  updatedAt: Date;
}

export interface Produto {
  id: number;
  nome: string;
  descricao?: string;
  preco: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ItemOrcamento {
  id: number;
  quantidade: number;
  valorUnitario: number;
  desconto?: number;
  produtoId: number;
  produto: Produto;
}

export interface Orcamento {
  id: number;
  numero: string;
  data: Date;
  validade?: Date;
  status: "pendente" | "aprovado" | "rejeitado";
  observacoes?: string;
  clienteId: number;
  cliente: Cliente;
  itens: ItemOrcamento[];
  valorTotal: number;
  createdAt: Date;
  updatedAt: Date;
}
