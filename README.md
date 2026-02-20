# 💧 Palco d'Água - ERP

Sistema de Planeamento de Recursos Empresariais (ERP) desenvolvido em Laravel para a gestão centralizada das operações da Palco d'Água - Desentupimentos Mecanizados. Este projeto foca-se em escalabilidade, segurança e adoção das melhores práticas de engenharia de software (Clean Code, SOLID e Design Patterns).

---

## 🚀 Tecnologias e Requisitos

Para garantir a estabilidade e segurança da aplicação, o ambiente de desenvolvimento local ou de produção deve cumprir estritamente os seguintes requisitos:

* **PHP:** >= 8.2 (Requisito obrigatório do framework)
* **Framework:** Laravel 11.x
* **Base de Dados:** MariaDB 11.4.9
* **Gestor de Dependências PHP:** [Composer](https://getcomposer.org/)
* **Gestor de Pacotes Frontend:** [Node.js](https://nodejs.org/) (com NPM)

---

## ⚙️ Instalação e Configuração Local

Siga os passos abaixo para preparar o ambiente de desenvolvimento isolado:

**1. Clonar o repositório**
```
https://github.com/C3lsoBatista/Palco_dAgua.git
cd Palco_dAgua/ERP
```

**2. Instalar dependências do Backend**
```
composer install
```

**3. Instalar dependências do Frontend e compilar os assets**
```
npm install
npm run build
```

**4. Configurar as variáveis de ambiente**
Faça uma cópia do ficheiro de exemplo para criar o seu ambiente local:
```
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

**5. Gerar a chave de encriptação da aplicação**
```
php artisan key:generate
```

**6. Migrar a Base de Dados e injetar dados essenciais (Seeders)**
```
php artisan migrate --seed
```

**7. Criar o link simbólico para os ficheiros (Storage)**
```
php artisan storage:link
```

---

## 🏃 Executar a Aplicação

**1. Para iniciar o servidor de desenvolvimento embutido do PHP:**

```
php artisan serve
```

A aplicação estará disponível em `http://localhost:8000`.

**2. Para compilação contínua dos ficheiros de frontend (Tailwind/Vite) durante o desenvolvimento:**
```
npm run dev
```
