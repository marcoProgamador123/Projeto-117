var date = new Date()
let display_date = 'Data: '+date.toLocaleDateString('pt-BR', {weekday:"short",year:"numeric",month:"short",day:'numeric'})
//  Busque a data atual e atualize-a no DOM
$(document).ready(function(){
    $("#date").html(display_date)

})
$(function(){


    // Escreva um evento, quando o botão Enviar for clicado
    $('#button').click(function(){

        //  Obtenha o valor do texto da área de texto usando o método 'val()'
        let text_value = $('#text').val()

        //  Converta-o em um objeto JS.
        //  Forneça uma "chave" aqui e escreva o mesmo no arquivo app.py também para extrair dados
        let input_text = {'text' : text_value}
        console.log(input_text)

        //  requisição ajax
        $.ajax({

            //  tipo da requisição web
            type : 'POST',

            //URL
            url:"/predict-emotion",

            //  dados a serem enviados no formato JSON
            data : JSON.stringify(input_text),

            //  o tipo de resposta esperado é json
            dataType : 'json',

            //  contentType
            contentType : 'application/json',


            //  se tudo funcionar, execute esta função
            success : function(result){
                predicted_emotion = result.data.predicted_emotion
                emo_url = result.data.predicted_emoji


            
                $("#sentiment").html(predicted_emotion)
                $('#sentiment').css("display", "block");

                $("#emoji").attr('src', emo_url);
                $('#emoji').css("display", "block");

               
            },

            //  se houver algum erro, execute esta função
            error : function(result){

                alert(result.responseJSON.message)
            }
        })


        //  limpando a caixa de texto após cada pressionamento de botão
        $('#text').val("")
    })
        
})