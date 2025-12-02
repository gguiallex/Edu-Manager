# Edu Manager - Sistema Escolar

Este projeto é um sistema web completo voltado para escolas do 6º ano ao 3º ano do ensino médio, permitindo que alunos, professores e gestores interajam em um ambiente educacional centralizado. O sistema inclui funcionalidades de gestão de notas, frequência, conteúdos e administração acadêmica.

---

## 📚 Funcionalidades Principais

### 👨‍🎓 Área do Aluno
- Visualização de boletim
- Histórico de notas
- Frequência
- Perfil e informações pessoais
- Matérias e professores

### 👨‍🏫 Área do Professor
- Dashboard com overview das turmas
- Listagem de turmas
- Lançamento de notas por turma
- Registro de frequência
- Postagem de conteúdos/atividades
- Visualização dos detalhes da turma

### 🧑‍💼 Área do Gestor (Diretor)
- Cadastro de alunos
- Cadastro de professores
- Atribuição de turmas
- Atribuição de matérias
- Gerenciamento de solicitações de inscrição
- Controle geral da escola

---

## 📁 Estrutura de Pastas (Next.js 16 - App Router)

```
app/
 ├── login/
 │     └── page.tsx
 ├── Register/
 │     └── page.tsx
 ├── students/
 │     ├── page.tsx
 │     ├── profile/
 │     │      └── page.tsx
 │     ├── report/
 │     │      └── page.tsx
 │     └── subjects/
 │            ├── page.tsx
 │            └── [id]/
 │                  └── page.tsx
 ├── teachers/
 │     ├── page.tsx
 │     ├── classes/
 │     │      ├── page.tsx
 │     │      └── [id]/
 │     │             ├── page.tsx
 │     │             ├── grades/
 │     │             │      └── page.tsx
 │     │             ├── attendance/
 │     │             │      └── page.tsx
 │     │             └── content/
 │     │                    └── page.tsx
 ├── manager/
 │     ├── page.tsx
 │     ├── classes/
 │     ├── requests/
 │     └── users/
 └── layout.tsx
```

---

## 🧰 Tecnologias Utilizadas

- **Next.js 16** (App Router)
- **React**
- **TypeScript**
- **TailwindCSS**
- **React Icons**
- **API Routes para backend**
- **Banco de dados** (a definir)

---

## 🚀 Como rodar o projeto

### 1. Instale as dependências:
```
npm install
```

### 2. Rode o servidor de desenvolvimento:
```
npm run dev
```

### 3. Acesse:
```
http://localhost:3000
```

---

## 📌 Objetivo do Projeto

Criar um sistema moderno, responsivo e funcional que simule um ambiente escolar real, baseado em rotinas práticas de escolas brasileiras.

---

## 📄 Licença
Projeto acadêmico — uso livre para fins educativos.