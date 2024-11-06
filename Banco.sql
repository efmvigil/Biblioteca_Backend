-- Tabela de Usuários
CREATE TABLE Usuarios (
    ID SERIAL PRIMARY KEY,
    Nome VARCHAR(255),
    Matricula INT UNIQUE,
    Senha VARCHAR(255),
    Email VARCHAR(255) UNIQUE,
    Telefone VARCHAR(15),
    D_E_L_E_T_E BOOLEAN
);

-- Tabela de Autores
CREATE TABLE Autores (
    ID SERIAL PRIMARY KEY,
    Nome VARCHAR(255),
    Nacionalidade VARCHAR(255)
);

-- Tabela de Bibliotecários
CREATE TABLE Bibliotecario (
    ID SERIAL PRIMARY KEY,
    Nome VARCHAR(255),
    CPF VARCHAR(11) UNIQUE,
    Senha VARCHAR(255),
    Email VARCHAR(255) UNIQUE,
    Telefone VARCHAR(15),
    D_E_L_E_T_E BOOLEAN
);

-- Tabela de Editora
CREATE TABLE Editora (
    ID SERIAL PRIMARY KEY,
    Nome VARCHAR(255),
    Nacionalidade VARCHAR(255)
);
-- Tabela de Livros
CREATE TABLE Livros (
    ID SERIAL PRIMARY KEY,
    Titulo VARCHAR(255),
    Autor INT, -- Foreign Key para a tabela Autores
    ISBN VARCHAR(13) UNIQUE,
    Ano INT,
    Edicao VARCHAR(50),
    Imagem VARCHAR(255),
    Editora INT, -- Foreign Key para a tabela Editora
    Usuario INT, -- Foreign Key para a tabela Usuarios
    CONSTRAINT fk_autor FOREIGN KEY (Autor) REFERENCES Autores(ID),
    CONSTRAINT fk_editora FOREIGN KEY (Editora) REFERENCES Editora(ID),
    CONSTRAINT fk_usuario FOREIGN KEY (Usuario) REFERENCES Usuarios(ID));

-- Tabela de Livros Retirados
CREATE TABLE Livros_Retirados (
    ID SERIAL PRIMARY KEY,
    Livro INT, -- Foreign Key para a tabela Livros
    Usuario INT, -- Foreign Key para a tabela Usuarios
    Data_Retirada DATE,
    Data_Devolucao DATE,
    Data_Devolvido DATE,
    Multa NUMERIC(10, 2),
    CONSTRAINT fk_livro FOREIGN KEY (Livro) REFERENCES Livros(ID),
    CONSTRAINT fk_usuario_livro FOREIGN KEY (Usuario) REFERENCES Usuarios(ID)
);