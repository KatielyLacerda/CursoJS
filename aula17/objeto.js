let amg = {nome:'José', sexo:'F', peso: 85.4,engordar (p=0){
      console.log('Engordou')
      this.peso+=p
}}
amg.engordar(2)
//estou colocando função dentro da variável!
console.log(`${amg.nome} pesa ${amg.peso}Kg`)