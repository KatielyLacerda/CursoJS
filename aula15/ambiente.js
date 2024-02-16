let num=[5,8,4] //posiçõa 0,1,2
num.push(1)
//num.sort() uso pra ordenar o vetor 
console.log(num)
console.log(`O vetor tem ${num.length} posições`)
console.log(`O primeiro elemento do vetor é o ${num[0]}`)
//como formatar o vetor pra sair de um jeito bonitinho
for(let pos=0;pos<num.length; pos++){
    console.log(num[pos])
}
//esse é um jeito mais antigo, recentemente é mais usando o //
for(let pos in num){
    console.log(`O valor na casa ${pos} é o ${num[pos]}`)
}
//buscando valores dentro d eum vetor
let pos=num.indexOf(2)
if(pos!= -1){
    console.log(`O valor foi encontrado na posição ${pos}`)
}else{
    console.log('O valor não foi encontrado')
}
