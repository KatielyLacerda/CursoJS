 function verificar(){
    
    //pegando o ano de agira e a data 
    var data= new Date()
    var ano =data.getFullYear() //pega o ano com 4 dígitos
    //pega o ano que a pessoa digitou pelo nosso id
    var fano=document.getElementById('txtano')
    var res=document.getElementById('res')
    console.log('fano ', fano.value)
    console.log('res ', res)
    if(fano.value.length==0 || Number(fano.value) >ano){
        window.alert('ERRO. Verifique os dados e tente novamente.')
    }else{
         var fsex=document.getElementsByName('radsex')
         var idade=ano-Number(fano.value)
         console.log(ano)
         //res.innerHTML`Idade calculada ${idade}` só pra ver se funciona a idade
         var genero=''
         var img =document.createElement('img')
         img.setAttribute('id','foto')
         if(fsex[0].checked){
            genero='Homem'
            if(idade>=0 && idade<12){
                img.setAttribute('src', 'crianca menino.png')
            }else if(idade<21){
                img.setAttribute('src', 'jovem homem.png')
            }else if(idade<50){
                img.setAttribute('src', 'homem adulto.png')
            }else{
                img.setAttribute('src', 'homem idoso.png')
            }

         }else if(fsex[1].checked){
            genero='Mulher'
            if(idade>=0 && idade<12){
                img.setAttribute('src', 'crianca menina.png')
            }else if(idade<21){
                img.setAttribute('src', 'jovem mulher.png')
            }else if(idade<50){
                img.setAttribute('src', 'mulher adulta.png')
            }else{
                img.setAttribute('src', 'mulher idosa.png')
            } 
         }
         res.style.textAlign='center'
         res.innerHTML=`Detectamos ${genero} com a idade ${idade}` 
         res.append(img)
    }

 } 