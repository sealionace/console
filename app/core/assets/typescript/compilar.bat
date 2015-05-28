@echo off
REM utilitario para compilar os typescripts do projeto
REM escrito por Jose Carlos Cieni Junior

REM opcoes da linha de comando
REM OP=

REM modo interativo?
REM if [[ $1 = "-i" ]]; then
REM 	OP=-i
REM fi

REM cria diretorios de saida
md out
md definitions

REM compila em typescript tudo o que esta nessa pasta
FOR %%A IN (*.ts) DO ( tsc -d -m commonjs --outDir out %%A )

REM move os arquivos gerados para seus respectivos lugares
FOR %%A IN (out\*.d.ts) DO ( move %%A definitions )
FOR %%A IN (out\*.js) DO ( move %%A .. )

REM apaga o diretorio de saida
rm -r out

@echo on