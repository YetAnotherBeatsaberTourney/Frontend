function changeScoreline(player,score) {
    if (P1 == player[0]) {
        if (score[0] == 0) {
            if (P1Score != score[0]) {
                document.getElementById("leftPoints").style.opacity='0';

                setTimeout(function(){
                    for (i = 1; i <= pointAmountU; i++) {
                        document.getElementById("lu"+i).src = "./images/LeftTopNoPoint.png";
                    }
                    for (i = 1; i <= pointAmountL; i++) {
                        document.getElementById("ll"+i).src = "./images/LeftNoPoint.png";
                    }
                    document.getElementById("leftPoints").style.opacity='1';
                }, 500);
            }
            P1Score = score[0];
        }
        if (score[0] == 1) {
            if (P1Score < score[0]) {
                document.getElementById("ll1").style.opacity='0';

                setTimeout(function(){
                    document.getElementById("ll1").src = "./images/Left.png";
                    document.getElementById("ll1").style.opacity='1';
                }, 500);
            }
            
            if (P1Score > score[0]) {
                document.getElementById("leftPoints").style.opacity='0';

                setTimeout(function(){
                    for (i = 2; i <= pointAmountL; i++) {
                        document.getElementById("ll"+i).src = "./images/LeftNoPoint.png";
                    }
                    for (i = 1; i <= pointAmountU; i++) {
                        document.getElementById("lu"+i).src = "./images/LeftTopNoPoint.png";
                    }
                    document.getElementById("leftPoints").style.opacity='1';
                }, 500);
            }
            P1Score = score[0];
        }
        if (score[0] == 2) {
            if (P1Score < score[0]) {
                document.getElementById("lu1").style.opacity='0';

                setTimeout(function(){
                    document.getElementById("lu1").src = "./images/LeftTopPoint.png";
                    document.getElementById("lu1").style.opacity='1';
                }, 500);
            }
            
            if (P1Score > score[0]) {
                document.getElementById("leftPoints").style.opacity='0';

                setTimeout(function(){
                    for (i = 2; i <= pointAmountL; i++) {
                        document.getElementById("ll"+i).src = "./images/LeftNoPoint.png";
                    }
                    for (i = 2; i <= pointAmountU; i++) {
                        document.getElementById("lu"+i).src = "./images/LeftTopNoPoint.png";
                    }
                    document.getElementById("leftPoints").style.opacity='1';
                }, 500);
            }
            P1Score = score[0];
        }
        if (score[0] == 3) {
            if (P1Score < score[0]) {
                document.getElementById("ll2").style.opacity='0';

                setTimeout(function(){
                    document.getElementById("ll2").src = "./images/Left.png";
                    document.getElementById("ll2").style.opacity='1';
                }, 500);
            }
            
            if (P1Score > score[0]) {
                document.getElementById("leftPoints").style.opacity='0';

                setTimeout(function(){
                    for (i = 3; i <= pointAmountL; i++) {
                        document.getElementById("ll"+i).src = "./images/LeftNoPoint.png";
                    }
                    for (i = 2; i <= pointAmountU; i++) {
                        document.getElementById("lu"+i).src = "./images/LeftTopNoPoint.png";
                    }
                    document.getElementById("leftPoints").style.opacity='1';
                }, 500);
            }
            P1Score = score[0];
        }
        if (score[0] == 4) {
            if (P1Score < score[0]) {
                document.getElementById("lu2").style.opacity='0';

                setTimeout(function(){
                    document.getElementById("lu2").src = "./images/LeftTopPoint.png";
                    document.getElementById("lu2").style.opacity='1';
                }, 500);
            }
            
            if (P1Score > score[0]) {
                document.getElementById("leftPoints").style.opacity='0';

                setTimeout(function(){
                    for (i = 3; i <= pointAmountL; i++) {
                        document.getElementById("ll"+i).src = "./images/LeftNoPoint.png";
                    }
                    for (i = 3; i <= pointAmountU; i++) {
                        document.getElementById("lu"+i).src = "./images/LeftTopNoPoint.png";
                    }
                    document.getElementById("leftPoints").style.opacity='1';
                }, 500);
            }
            P1Score = score[0];
        }
        if (score[0] == 5) {
            if (P1Score < score[0]) {
                document.getElementById("ll3").style.opacity='0';

                setTimeout(function(){
                    document.getElementById("ll3").src = "./images/Left.png";
                    document.getElementById("ll3").style.opacity='1';
                }, 500);
            }
            
            if (P1Score > score[0]) {
                document.getElementById("leftPoints").style.opacity='0';

                setTimeout(function(){
                    for (i = 4; i <= pointAmountL; i++) {
                        document.getElementById("ll"+i).src = "./images/LeftNoPoint.png";
                    }
                    for (i = 3; i <= pointAmountU; i++) {
                        document.getElementById("lu"+i).src = "./images/LeftTopNoPoint.png";
                    }
                    document.getElementById("leftPoints").style.opacity='1';
                }, 500);
            }
            P1Score = score[0];
        }
        if (score[0] == 6) {
            if (P1Score < score[0]) {
                document.getElementById("lu3").style.opacity='0';

                setTimeout(function(){
                    document.getElementById("lu3").src = "./images/LeftTopPoint.png";
                    document.getElementById("lu3").style.opacity='1';
                }, 500);
            }
            
            if (P1Score > score[0]) {
                document.getElementById("leftPoints").style.opacity='0';

                setTimeout(function(){
                    for (i = 4; i <= pointAmountL; i++) {
                        document.getElementById("ll"+i).src = "./images/LeftNoPoint.png";
                    }
                    for (i = 4; i <= pointAmountU; i++) {
                        document.getElementById("lu"+i).src = "./images/LeftTopNoPoint.png";
                    }
                    document.getElementById("leftPoints").style.opacity='1';
                }, 500);
            }
            P1Score = score[0];
        }
        if (score[0] == 7) {
            if (P1Score < score[0]) {
                document.getElementById("ll4").style.opacity='0';

                setTimeout(function(){
                    document.getElementById("ll4").src = "./images/Left.png";
                    document.getElementById("ll4").style.opacity='1';
                }, 500);
            }
            
            if (P1Score > score[0]) {
                document.getElementById("leftPoints").style.opacity='0';

                setTimeout(function(){
                    for (i = 5; i <= pointAmountL; i++) {
                        document.getElementById("ll"+i).src = "./images/LeftNoPoint.png";
                    }
                    for (i = 4; i <= pointAmountU; i++) {
                        document.getElementById("lu"+i).src = "./images/LeftTopNoPoint.png";
                    }
                    document.getElementById("leftPoints").style.opacity='1';
                }, 500);
            }
            P1Score = score[0];
        }
        if (score[0] == 8) {
            if (P1Score < score[0]) {
                document.getElementById("lu4").style.opacity='0';

                setTimeout(function(){
                    document.getElementById("lu4").src = "./images/LeftTopPoint.png";
                    document.getElementById("lu4").style.opacity='1';
                }, 500);
            }
            
            if (P1Score > score[0]) {
                document.getElementById("leftPoints").style.opacity='0';

                setTimeout(function(){
                    for (i = 5; i <= pointAmountL; i++) {
                        document.getElementById("ll"+i).src = "./images/LeftNoPoint.png";
                    }
                    for (i = 5; i <= pointAmountU; i++) {
                        document.getElementById("lu"+i).src = "./images/LeftTopNoPoint.png";
                    }
                    document.getElementById("leftPoints").style.opacity='1';
                }, 500);
            }
            P1Score = score[0];
        }
        if (score[0] == 9) {
            if (P1Score < score[0]) {
                document.getElementById("ll5").style.opacity='0';

                setTimeout(function(){
                    document.getElementById("ll5").src = "./images/Left.png";
                    document.getElementById("ll5").style.opacity='1';
                }, 500);
            }
            
            if (P1Score > score[0]) {
                document.getElementById("leftPoints").style.opacity='0';

                setTimeout(function(){
                    for (i = 6; i <= pointAmountL; i++) {
                        document.getElementById("ll"+i).src = "./images/LeftNoPoint.png";
                    }
                    for (i = 5; i <= pointAmountU; i++) {
                        document.getElementById("lu"+i).src = "./images/LeftTopNoPoint.png";
                    }
                    document.getElementById("leftPoints").style.opacity='1';
                }, 500);  
            }
            P1Score = score[0];
        }
    }
    if (P2 == player[1]) {
        if (score[1] == 0) {
            if (P2Score != score[1]) {
                document.getElementById("rightPoints").style.opacity='0';

                setTimeout(function(){
                    for (i = 1; i <= pointAmountU; i++) {
                        document.getElementById("ru"+i).src = "./images/RightTopNoPoint.png";
                    }
                    for (i = 1; i <= pointAmountL; i++) {
                        document.getElementById("rl"+i).src = "./images/RightNoPoint.png";
                    }
                    document.getElementById("rightPoints").style.opacity='1';
                }, 500);
            }
            P2Score = score[1];
        }
        if (score[1] == 1) {
            if (P2Score < score[1]) {
                document.getElementById("rl1").style.opacity='0';

                setTimeout(function(){
                    document.getElementById("rl1").src = "./images/Right.png";
                    document.getElementById("rl1").style.opacity='1';
                }, 500);
            }
            
            if (P2Score > score[1]) {
                document.getElementById("rightPoints").style.opacity='0';

                setTimeout(function(){
                    for (i = 2; i <= pointAmountL; i++) {
                        document.getElementById("rl"+i).src = "./images/RightNoPoint.png";
                    }
                    for (i = 1; i <= pointAmountU; i++) {
                        document.getElementById("ru"+i).src = "./images/RightTopNoPoint.png";
                    }
                    document.getElementById("rightPoints").style.opacity='1';
                }, 500);
            }
            P2Score = score[1];
        }
        if (score[1] == 2) {
            if (P2Score < score[1]) {
                document.getElementById("ru1").style.opacity='0';

                setTimeout(function(){
                    document.getElementById("ru1").src = "./images/RightTopPoint.png";
                    document.getElementById("ru1").style.opacity='1';
                }, 500);
            }
            
            if (P2Score > score[1]) {
                document.getElementById("rightPoints").style.opacity='0';

                setTimeout(function(){
                    for (i = 2; i <= pointAmountL; i++) {
                        document.getElementById("rl"+i).src = "./images/RightNoPoint.png";
                    }
                    for (i = 2; i <= pointAmountU; i++) {
                        document.getElementById("ru"+i).src = "./images/RightTopNoPoint.png";
                    }
                    document.getElementById("rightPoints").style.opacity='1';
                }, 500);
            }
            P2Score = score[1];
        }
        if (score[1] == 3) {
            if (P2Score < score[1]) {
                document.getElementById("rl2").style.opacity='0';

                setTimeout(function(){
                    document.getElementById("rl2").src = "./images/Right.png";
                    document.getElementById("rl2").style.opacity='1';
                }, 500);
            }
            
            if (P2Score > score[1]) {
                document.getElementById("rightPoints").style.opacity='0';

                setTimeout(function(){
                    for (i = 3; i <= pointAmountL; i++) {
                        document.getElementById("rl"+i).src = "./images/RightNoPoint.png";
                    }
                    for (i = 2; i <= pointAmountU; i++) {
                        document.getElementById("ru"+i).src = "./images/RightTopNoPoint.png";
                    }
                    document.getElementById("rightPoints").style.opacity='1';
                }, 500);
            }
            P2Score = score[1];
        }
        if (score[1] == 4) {
            if (P2Score < score[1]) {
                document.getElementById("ru2").style.opacity='0';

                setTimeout(function(){
                    document.getElementById("ru2").src = "./images/RightTopPoint.png";
                    document.getElementById("ru2").style.opacity='1';
                }, 500);
            }
            
            if (P2Score > score[1]) {
                document.getElementById("rightPoints").style.opacity='0';

                setTimeout(function(){
                    for (i = 3; i <= pointAmountL; i++) {
                        document.getElementById("rl"+i).src = "./images/RightNoPoint.png";
                    }
                    for (i = 3; i <= pointAmountU; i++) {
                        document.getElementById("ru"+i).src = "./images/RightTopNoPoint.png";
                    }
                    document.getElementById("rightPoints").style.opacity='1';
                }, 500);
            }
            P2Score = score[1];
        }
        if (score[1] == 5) {
            if (P2Score < score[1]) {
                document.getElementById("rl3").style.opacity='0';

                setTimeout(function(){
                    document.getElementById("rl3").src = "./images/Right.png";
                    document.getElementById("rl3").style.opacity='1';
                }, 500);
            }
            
            if (P2Score > score[1]) {
                document.getElementById("rightPoints").style.opacity='0';

                setTimeout(function(){
                    for (i = 4; i <= pointAmountL; i++) {
                        document.getElementById("rl"+i).src = "./images/RightNoPoint.png";
                    }
                    for (i = 3; i <= pointAmountU; i++) {
                        document.getElementById("ru"+i).src = "./images/RightTopNoPoint.png";
                    }
                    document.getElementById("rightPoints").style.opacity='1';
                }, 500);
            }
            P2Score = score[1];
        }
        if (score[1] == 6) {
            if (P2Score < score[1]) {
                document.getElementById("ru3").style.opacity='0';

                setTimeout(function(){
                    document.getElementById("ru3").src = "./images/RightTopPoint.png";
                    document.getElementById("ru3").style.opacity='1';
                }, 500);
            }
            
            if (P2Score > score[1]) {
                document.getElementById("rightPoints").style.opacity='0';

                setTimeout(function(){
                    for (i = 4; i <= pointAmountL; i++) {
                        document.getElementById("rl"+i).src = "./images/RightNoPoint.png";
                    }
                    for (i = 4; i <= pointAmountU; i++) {
                        document.getElementById("ru"+i).src = "./images/RightTopNoPoint.png";
                    }
                    document.getElementById("rightPoints").style.opacity='1';
                }, 500);
            }
            P2Score = score[1];
        }
        if (score[1] == 7) {
            if (P2Score < score[1]) {
                document.getElementById("rl4").style.opacity='0';

                setTimeout(function(){
                    document.getElementById("rl4").src = "./images/Right.png";
                    document.getElementById("rl4").style.opacity='1';
                }, 500);
            }
            
            if (P2Score > score[1]) {
                document.getElementById("rightPoints").style.opacity='0';

                setTimeout(function(){
                    for (i = 5; i <= pointAmountL; i++) {
                        document.getElementById("rl"+i).src = "./images/RightNoPoint.png";
                    }
                    for (i = 4; i <= pointAmountU; i++) {
                        document.getElementById("ru"+i).src = "./images/RightTopNoPoint.png";
                    }
                    document.getElementById("rightPoints").style.opacity='1';
                }, 500);
            }
            P2Score = score[1];
        }
        if (score[1] == 8) {
            if (P2Score < score[1]) {
                document.getElementById("ru4").style.opacity='0';

                setTimeout(function(){
                    document.getElementById("ru4").src = "./images/RightTopPoint.png";
                    document.getElementById("ru4").style.opacity='1';
                }, 500);
            }
            
            if (P2Score > score[1]) {
                document.getElementById("rightPoints").style.opacity='0';

                setTimeout(function(){
                    for (i = 5; i <= pointAmountL; i++) {
                        document.getElementById("rl"+i).src = "./images/RightNoPoint.png";
                    }
                    for (i = 5; i <= pointAmountU; i++) {
                        document.getElementById("ru"+i).src = "./images/RightTopNoPoint.png";
                    }
                    document.getElementById("rightPoints").style.opacity='1';
                }, 500);
            }
            P2Score = score[1];
        }
        if (score[1] == 9) {
            if (P2Score < score[1]) {
                document.getElementById("rl5").style.opacity='0';

                setTimeout(function(){
                    document.getElementById("rl5").src = "./images/Right.png";
                    document.getElementById("rl5").style.opacity='1';
                }, 500);
            }
            
            if (P2Score > score[1]) {
                document.getElementById("rightPoints").style.opacity='0';

                setTimeout(function(){
                    for (i = 6; i <= pointAmountL; i++) {
                        document.getElementById("rl"+i).src = "./images/RightNoPoint.png";
                    }
                    for (i = 5; i <= pointAmountU; i++) {
                        document.getElementById("ru"+i).src = "./images/RightTopNoPoint.png";
                    }
                    document.getElementById("rightPoints").style.opacity='1';
                }, 500);  
            }
            P2Score = score[1];
        }
    }
}