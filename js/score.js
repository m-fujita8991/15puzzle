document.addEventListener('DOMContentLoaded', function() {
    //画面をロードしたら
    window.addEventListener('load', (event) => {
        document.getElementById("ranking").innerHTML = "";
            
            //会員クラスを検索するクエリを作成
            var ScoreClass = ncmb.DataStore("HighScore");
            ScoreClass.order("score", false)
                .limit(10)
                .fetchAll()
                .then(function(results){
                        //検索が成功した場合は会員情報のリストをdisplayRankingメソッドに渡す
                        displayRanking(results);              
                })
                .catch(function(error){
                        //エラー
                });
    });
});

//上位50番目までのランキングを表示
function displayRanking(ranking){
    var count = 1;
    for (var i = 0; i < ranking.length; i++){
        var topUser = ranking[i];
        var rank = document.getElementById("ranking");
        var text = "";
        if(topUser.get("score") == tmp){
        }else{    
            count = i + 1;
        }
        switch(i){
            case 0:
                var text = "🏅" + count + "位...ユーザー名:" + topUser.get("name") + ", 手数:" + topUser.get("score");
                break;
            case 1:
                var text = "🥈" + count + "位...ユーザー名:" + topUser.get("name") + ", 手数:" + topUser.get("score");
                break;
            case 2:
                var text = "🥉" + count + "位...ユーザー名:" + topUser.get("name") + ", 手数:" + topUser.get("score");
                break;
            default:
                var text = count + "位...ユーザー名:" + topUser.get("name") + ", 手数:" + topUser.get("score");
                break;
                
        }
        rank.innerHTML += (text + "<br>");
        var tmp = topUser.get("score");
    }
}
