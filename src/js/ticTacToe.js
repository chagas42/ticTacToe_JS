const board = ['', '', '', '', '', '', '', '', '']; 

const winning_sequences = [     
    [0,1,2], 
    [3,4,5], 
    [6,7,8], 
    [0,3,6], 
    [1,4,7], 
    [2,5,8],
    [0,4,8],
    [2,4,6] 
]; 

const simbols = {
    options:['X', 'O'], 
    turn_index:0, 
    change: function(){ 
        this.turn_index = ((this.turn_index === 0) ? 1 : 0 ); 
    }
}; 

let score_X = null; 
let score_O = null; 
let play_button_element = null; 
let message_winning_element = null; 
let container_element = null; 
let gameover = false; 

const init = ( element1, element2, element3, element4, element5 ) => { 
    
    container_element = element1; 
    message_winning_element = element2; 
    play_button_element = element3; 
    score_O = element4; 
    score_X = element5; 

}; 

const make_play = ( position ) => { 

    if(gameover == true){
        return false; 
    };

    if(board[position] === '' ){ 

        board[position] = simbols.options[ simbols.turn_index ]; 
        draw(); 
        let winning_sequences_index = check_winning_sequences( simbols.options[ simbols.turn_index ] ); 

        if( winning_sequences_index >= 0 ){

            game_is_over(); 

        } else { 

            simbols.change(); 

        }

        return true; 

    } else {

        return false; 

    }
}; 

function game_is_over(){ 

    gameover = true; 
    console.log('GAME OVER'); 

};

function restart(){ 

    board.fill(''); 
    message_winning_element.style.display = 'none'; 
    draw(); 
    gameover = false; 
    document.querySelector('.message-placar-O').style.display = 'none'; 
    document.querySelector('.message-placar-X').style.display = 'none'; 

}; 

function check_winning_sequences(simbol){ 

    for(i in winning_sequences ){ 
        
        if( board [ winning_sequences[i][0] ] == simbol &&
            board [ winning_sequences[i][1] ] == simbol &&
            board [ winning_sequences[i][2] ] == simbol  ){ 
                message_winning(simbol); 
                return i; 
            }

    }; 
    return -1; 

}; 

function message_winning(simbol){ //mostra o 

    message_winning_element.style.display = 'block'; 
    play_button_element.innerHTML = 'Restart'; 
    write_winning(simbol); 

}; 

function write_winning(simbol){ //escreve na tela qual player foi vitorioso  
    
    let pontos_X = score_X.innerHTML; 
    let pontos_O = score_O.innerHTML; 
    if( simbol =='X' ){ 

        document.querySelector('.message-placar-X').style.display = 'flex'; 
        score_X.innerHTML = Number( pontos_X ) + 1; 
    
    } else { 

        document.querySelector('.message-placar-O').style.display = 'flex'; 
        score_O.innerHTML = Number( pontos_O ) + 1; 

    }

}; 

function draw(){ //desenha a ação no nosso board atraves da função make_play

    let content = ''; 
    for( i in board){ 
        
        content += '<div onclick="make_play(' + i + ')">' + board[i] + '</div>'; 

    }
    container_element.innerHTML = content; 

}; 
