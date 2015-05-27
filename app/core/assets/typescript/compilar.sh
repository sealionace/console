#!/bin/bash

# utilitario para compilar os typescripts do projeto
# escrito por Jose Carlos Cieni Junior

# opcoes da linha de comando
OP=

# modo interativo?
if [[ $1 = "-i" ]]; then
	OP=-i
fi

# cria diretorios de saida
mkdir -p ./out
mkdir -p ./definitions

# compila em typescript tudo o que esta nessa pasta
/usr/local/bin/tsc -d -m commonjs --outDir out *.ts

# move os arquivos gerados para seus respectivos lugares
mv $OP ./out/*.d.ts ./definitions
mv $OP ./out/*.js ../

#mv $OP ./definitions/index.d.ts ./definitions/ace.d.ts

# apaga o diretorio de saida
rm $OP -r ./out
