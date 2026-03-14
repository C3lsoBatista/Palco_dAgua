# 💧 Palco d'Água - ERP

Sistema de Planeamento de Recursos Empresariais (ERP) desenvolvido em Laravel para a gestão centralizada das operações da Palco d'Água - Desentupimentos Mecanizados. Este projeto foca-se em escalabilidade, segurança e adoção das melhores práticas de engenharia de software (Clean Code, SOLID e Design Patterns).

---

## 🚀 Tecnologias e Requisitos

Para garantir a estabilidade e segurança da aplicação, o ambiente de desenvolvimento local ou de produção deve cumprir estritamente os seguintes requisitos:
* **PHP:** >= 8.3
* **Framework:** [Laravel 12.x](https://laravel.com)
* **Frontend:** [React](https://reactjs.org) + [Inertia.js](https://inertiajs.com)
* **Estilização:** [Tailwind CSS](https://tailwindcss.com)
* **Base de Dados:** MariaDB 11.4.9
* **Gestor de Dependências PHP:** [Composer](https://getcomposer.org/)
* **Gestor de Pacotes Frontend:** [Node.js](https://nodejs.org/) (com NPM)

---

## 🛡️ Segurança e Auditoria

### 📋 Sistema de Auditoria
A aplicação utiliza o **[owen-it/laravel-auditing](https://www.laravel-auditing.com/)** para rastrear todas as alterações em modelos críticos.
- Registo automático de `created`, `updated` e `deleted`.
- Guardamos o utilizador responsável, IP, User Agent e os valores exatos modificados.
- Interface customizada para visualização de diferenças (diff) entre versões.

### 🔑 Controlo de Permissões
A gestão de acessos é garantida pelo **[spatie/laravel-permission](https://spatie.be/docs/laravel-permission/v6/introduction)**.
- Implementação de Roles (Perfis) e Permissions (Permissões).
- Proteção de rotas e botões da UI baseada nas capacidades do utilizador logado.

---

## ⚙️ Instalação e Configuração Local

Siga os passos abaixo para preparar o ambiente de desenvolvimento:

**1. Clonar o repositório**
```bash
git clone https://github.com/C3lsoBatista/Palco_dAgua.git
cd Palco_dAgua/ERP
```

**2. Instalar dependências do Backend**
```bash
composer install
```

**3. Instalar dependências do Frontend e compilar os assets**
```bash
npm install
npm run build
```

**4. Configurar as variáveis de ambiente**
Faça uma cópia do ficheiro `.env` para criar o seu ambiente local:
```bash
cp .env.example .env
```
Abra o ficheiro .env e configure a ligação exclusiva para o MariaDB:
```
DB_CONNECTION=mariadb
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nome_da_base_de_dados
DB_USERNAME=seu_utilizador
DB_PASSWORD=sua_password
```

**5. Gerar a chave de aplicação**
```bash
php artisan key:generate
```
**6. Migrar a Base de Dados e injetar dados essenciais (Seeders)**
```bash
php artisan migrate --seed
```

---

## 🏃 Executar a Aplicação

**1. Servidor Backend:**
```bash
php artisan serve
```
A aplicação estará disponível em `http://localhost:8000`.

**2. Compilação Frontend (Vite):**
```bash
npm run dev
```

