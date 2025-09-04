# import os
#
# def limpar_tela():
#     if os.name == 'nt':
#         os.system('cls')
#     else:
#         os.system('clear')
#
# def somar(a, b):
#     return a + b
# def subtrair(a, b):
#     return  a - b
# def multiplicar(a, b):
#     return a * b
# def dividir(a, b):
#     if b == 0:
#         print('Erro de divisão. divisão não pode ser feita por ZERO.')
#     return a / b
#
# def calculadora():
#     print('Calculadora do Gus.')
#
#     while True:
#         limpar_tela()
#         print('\n Escolha a operação que deseja fazer: ')
#         print('1 - Somar')
#         print('2 - Subtrair')
#         print('3 - Multiplicar')
#         print('4 - Dividir')
#         print('5 - Sair')
#
#         escolha = input('Escolha sua opção: ')
#
#
#         if escolha == '5':
#             print('Saindo da calculadora...')
#             break
#         if escolha not in ['1','2','3','4','5']:
#             print('Escolha inválida. tente novamente.')
#             continue
#
#         n1 = float(input('Digite o primeiro número: '))
#         n2= float(input('Digite o segundo número: '))
#
#         if escolha == '1':
#             print(f'Resultado de {n1} + {n2} = {somar(n1, n2)}')
#         elif escolha == '2':
#             print(f'Resultado de {n1} - {n2} = {subtrair(n1, n2)}')
#         if escolha == '3':
#             print(f'Resultado de {n1} * {n2} = {multiplicar(n1, n2)}')
#         if escolha == '4':
#             print(f'Resultado de {n1} / {n2} = {dividir(n1, n2)}')
# limpar_tela()
# calculadora()

import  os

def limpar_tela():
    if os.name == 'nt':
        os.system('cls')
    else:
        os.system('clear')

def somar(a, b):
    return a + b

def subtrair(a, b):
    return a - b

def multiplicar(a, b):
    return a * b

def dividir(a, b):
    if b == 0:
        print('Erro de divisão. não é possivel realizar divisão por ZERO.')
    return a / b

def calculadora():
    print('-> Calculadora do Gus <-')

    while True:
        limpar_tela()
        print('\nEscolha a operação que deseja realizar:')
        print('1 : Adição')
        print('2 : Subtração')
        print('3 : Multiplicação')
        print('4 : Divisão')
        print('5 : Sair')
        escolha = input('Digite aqui: ')

        if escolha == "5":
            print('Saindo da calculadora...')
            break
        if escolha not in ['1','2','3','4','5']:
            print('Opção inválida. Tente novamente.')
            continue

        operacoes = {
            '1':'Adição',
            '2':'Subtração',
            '3':'Multiplicação',
            '4':'Divisão'
        }
        print(f'A escolha foi {operacoes[escolha]}.')

        n1 = int(input('Digite o primeiro número: '))
        n2 = int(input('Digite o segundo número: '))

        if escolha == '1':
            print(f'O resultado de {n1} + {n2} = {somar(n1, n2)}')
        elif escolha == '2':
            print(f'O resultado de {n1} - {n2} = {subtrair(n1, n2)})')
        elif escolha == '3':
            print(f'O resultado de {n1} * {n2} = {multiplicar(n1, n2)}')
        elif escolha == '4':
            print(float(f'O resultado de {n1} / {n2} = {dividir(n1, n2)}'))

limpar_tela()
calculadora()
