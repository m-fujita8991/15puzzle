(function () {
    var username = prompt("名前を入力してください(この名前はランキングに表示されます)");
    if(!username){
        username = "ななし";
    }
    //画面をロードしたら
    window.addEventListener('load', (event) => {
        
        document.getElementById("user").innerHTML = "ようこそ " + username + " さん";
        //手数表示
        document.getElementById("tekazu").style.visibility = "visible";
        //手数リセット
        cnt = 0;
        cnthtml.innerHTML = cnt;
        //無限ループ
        while (true) {
            //シャッフルするdomdom
            komaArr = shuffle(komaArr);
            //解けるパズルならループを抜ける
            if (check(komaArr)) {
                break;
            }
        }
        //駒を並べる
        lineUp(komaArr);

        bgm();        
    });

    //シャッフル関数はこちらを参照　https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    //手数表示用
    var cnt = 0;
    var cnthtml = document.getElementById("count");

    //クリア後操作不可
    var flg = true;

    //駒配列
    //keyがセル
    //valueが数字
    var komaArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    //ゼロのkeyを覚える変数
    var zero;
    //最初に駒を並べる関数
    function lineUp(arr) {
        //駒配列の長さをループ
        for (var i = 0; i < 16; i++) {
            //配列のvalueが0でなかったら
            if (arr[i]) {
                //HTMLを変更
                document.getElementById("cell_" + i).innerHTML = "<button>" + arr[i] + "</button>";
                //駒にイベント登録
                //tdにidをつけているので
                //tdのfirstElementChild=最初の子要素のbuttonにイベントを追加する
                document.getElementById("cell_" + i).firstElementChild.addEventListener('click', move, false);
            } else {
                //配列のvalueが0なら
                //ゼロのkeyを覚える
                zero = i;
                //HTMLを変更
                document.getElementById("cell_" + i).innerHTML = "<br>";
            }
        }
    }
    //解けるパズルかどうかチェックする関数
    //参照 http://y-uti.hatenablog.jp/entry/2015/04/29/103422
    function check(arr) {
        //0のkey
        var z;
        //新しい配列を作る
        var a = new Array();
        //新しい配列の添字
        var i = 0;
        //0は何番目に出現？
        var j = 0;
        //コピー元の配列をループ
        for (var v in arr) {
            //valueが0でない時だけ
            if (arr[v]) {
                //新しい配列に追加
                a[i] = arr[v];
                i++;
            } else {
                //0は何番目か記憶する
                z = j;
            }
            j++;
        }
        //合計に使う変数
        var count;
        //0が何行目にあるか
        /*
         *  1  2  3  4
         *  5  6  7  8
         *  9 10 11 12
         * 13 14 15  0
         * この場合0は4行目にある
         *
         */
        if (z >= 0 && z <= 3) {
            count = 1;
        } else if (4 >= 0 && z <= 7) {
            count = 2;
        } else if (8 >= 0 && z <= 11) {
            count = 3;
        } else if (12 >= 0 && z <= 15) {
            count = 4;
        }
        //配列がなくなるまでループ
        while (a[0] !== undefined) {
            //配列の先頭を取得
            var lead = a[0];
            //配列の先頭を削除
            a.shift();
            //配列をループ
            for (var num in a) {
                if (lead > a[num]) {
                    count++;
                }
            }
        }
        //偶数なら解ける
        if (count % 2 === 0) {
            return true;
        } else {
            return false;
        }
    }
    //ゲームオーバー判定
    function finish() {
        //完成図
        var complete = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
        //完成図と比較
        if (complete.toString() === komaArr.toString()) {
            flg = false;
            return true;
        } else {
            return false;
        }
    }

    //se
    var my_audio1 = new Audio("se/button.mp3");
    var my_audio2 = new Audio("se/reset.mp3");
    var my_audio3 = new Audio("se/end.mp3");
    var my_bgm = new Audio("bgm/main.mp3");

    //駒移動の関数
    function move(e) {

        //操作可不可
        if (flg) {

            //クリックしたbuttonのあるtdのid
            var id = e.target.parentNode.id;
            //配列のkeyをidから取得
            var key = Number(id.replace("cell_", ""));
            //クリックした駒の上下左右のvalueの配列
            /*
            *  1  2  3  4
            *  5  6  7  8
            *  9 10 11 12
            * 13 14 15  0
            *
            * ４×４のマス目があり、クリックされた駒の
            * 上下左右を見て、もし0があれば移動できる
            *
            */
            var jgsy = new Array(4);
            //上
            jgsy[0] = komaArr[key - 4];
            //下
            jgsy[1] = komaArr[key + 4];
            //左
            jgsy[2] = key % 4 !== 0 ? komaArr[key - 1] : undefined;
            //右
            jgsy[3] = (key + 1) % 4 !== 0 ? komaArr[key + 1] : undefined;
            //上下左右のvalueの配列をループ
            for (var num in jgsy) {
                //上下左右に0があれば移動できる
                if (jgsy[num] === 0) {
                    //0のid
                    var zeroId = "cell_" + zero;
                    //配列変更
                    //0のvalueにクリックしたvalueを代入
                    var henkou = komaArr[zero] = komaArr[key];
                    //クリックしたvalueに0を代入
                    komaArr[key] = 0;
                    //ゼロのkeyを覚える
                    zero = key;
                    //HTMLを変更
                    document.getElementById(zeroId).innerHTML = "<button>" + henkou + "</button>";
                    //駒にイベント登録
                    document.getElementById(zeroId).firstElementChild.addEventListener('click', move, false);
                    //HTMLを変更
                    document.getElementById(id).innerHTML = "<br>";

                    //se play
                    my_audio1.play();

                    //手数cnt
                    cnt++;
                    cnthtml.innerHTML = cnt;

                    //ループを抜ける
                    break;
                }
            }

        }

        //ゲームオーバー判定
        if (finish()) {
            document.getElementById("finish").innerHTML = "finished";
            //データ保持
            var ScoreClass = ncmb.DataStore("HighScore");
            var score = new ScoreClass();
            score.set("name", username);
            score.set("score", cnt);
            score.save()
                .then(function () {
                    //保存成功時の処理
                })
                .catch(function (error) {
                    //失敗時の処理
                });
            //クリアしたら1分でタイトル画面へ
            setTimeout(function () {
                window.location.href = "title.html";
            }, 60000);
        } else {
            document.getElementById("finish").innerHTML = "";
        }
    }

    //ボタンを押したらリセット
    function reset() {
        document.getElementById("finish").innerHTML = "";

        //手数リセット
        cnt = 0;
        cnthtml.innerHTML = cnt;

        //無限ループ
        while (true) {
            //シャッフルする
            komaArr = shuffle(komaArr);
            //解けるパズルならループを抜ける
            if (check(komaArr)) {
                my_audio2.play();
                break;
            }
        }
        //駒を並べる
        lineUp(komaArr);
    }

    //ボタンを押したらエンド
    function end() {
        my_audio3.play();
        setTimeout(function () {
            window.location.href = "title.html";
        }, 1000);
    }

    function bgm() {
        my_bgm.loop = true;
        my_bgm.play();
    }

    //リセットボタンにイベント登録
    document.getElementById('reset').addEventListener('click', reset, false);
    //エンドボタンにイベント登録
    document.getElementById('end').addEventListener('click', end, false);
}());