$(document).ready(function (){
    
         
    $('.react-box').click(function(e){
        e.stopPropagation();
    })
    $('.react-modal__quite').click(function(e){
        // $('.react-modal').addClass('test');
        e.stopPropagation();
        $('.react-modal').removeClass('class-display-flex');
    })

    $('.react-modal').click(function(e){
        // $('.react-modal').addClass('test');
        e.stopPropagation();
        $('.react-modal').removeClass('class-display-flex');
    })
    
})