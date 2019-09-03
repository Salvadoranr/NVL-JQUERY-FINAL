var count = 0;
var end = false;
jQuery(document).ready(function () {

    $("td").on("click", selectedItem);
    $("td").mouseover(function () {
        $(this).addClass("over")
    });
    $("td").mouseout(function () {
        $(this).removeClass("over")
    });
    function selectedItem(event) {
        if (!end) {
            $("td.selected").removeClass("selected")
            $(this).addClass("selected");

            if (count % 2 === 0 && count < 9 && $("td.selected").text() === "") {
                $("td.selected").text("X");
                count++
            } else if (count < 9 && $("td.selected").text() === "") {
                $("td.selected").text("O");
                count++
            }
            winner();
        }
    }
    $("#reset").on("click", reset);
    function reset() {
        $("td").text("");
        $("td.selected").removeClass("selected");
        count = 0;
        end = false;
    }

    jQuery(document).keydown(function (evt) {
        switch (evt.key) {
            case "ArrowDown": moveDown();
                break;
            case "ArrowUp": moveUp();
                break;
            case "ArrowRight": moveRight();
                break;
            case "ArrowLeft": moveLeft();
                break;
            case "Enter": editBox();
                break;
        }

    })
    function moveDown() {
        var lastEl = $("tr").last().index();
        var elementIndex = $("td.selected").index();
        var actualEl = $("td.selected").parent().index();
        if (actualEl < lastEl) {
            $("tr").eq(actualEl + 1).children("td").eq(elementIndex).addClass("selected");
            $("tr").eq(actualEl).children("td").eq(elementIndex).removeClass("selected");
        }
    }
    function moveUp() {
        var elementIndex = $("td.selected").index();
        var actualEl = $("td.selected").parent().index();
        if (actualEl > 0) {
            $("tr").eq(actualEl - 1).children("td").eq(elementIndex).addClass("selected");
            $("tr").eq(actualEl).children("td").eq(elementIndex).removeClass("selected");

        }
    }
    function moveRight() {
        if ($("td.selected").next().next().prevObject.length) {
            $("td.selected").removeClass("selected").next().addClass("selected");
        }
    }
    function moveLeft() {
        if ($("td.selected").prev().prev().prevObject.length) {
            $("td.selected").removeClass("selected").prev().addClass("selected");
        }
    }
    function editBox() {
        if (!end) {
            if (count % 2 === 0 && count < 9 && $("td.selected").text() === "") {
                $("td.selected").text("X");
                count++
            } else if (count < 9 && $("td.selected").text() === "") {
                $("td.selected").text("O");
                count++
            }
            winner();
        }
    }
    function winner() {
        if (count >= 5) {
            var value = $("td.selected").text()
            findWinner(value);
        }
    }
    function setWinner(array) {
        $("td").eq(array[0]).addClass("selected")
        $("td").eq(array[1]).addClass("selected")
        $("td").eq(array[2]).addClass("selected")
        end = true;
        alert("GANADOR  " + $("td.selected")[0].innerText )
    }
    function tie(array) {
        array.forEach(element => {
            if (element === "") {
                return false;
            }
        });
        return true;
    }
    function findWinner(value) {
        var elements = [$("td")[0].innerText, $("td")[1].innerText, $("td")[2].innerText, $("td")[3].innerText, $("td")[4].innerText, $("td")[5].innerText, $("td")[6].innerText, $("td")[7].innerText, $("td")[8].innerText]
        if ($("td")[0].innerText === value && $("td")[1].innerText === value && $("td")[2].innerText === value) { setWinner([0, 1, 2]) }
        else if ($("td")[3].innerText === value && $("td")[4].innerText === value && $("td")[5].innerText === value) { setWinner([3, 4, 5]) }
        else if ($("td")[6].innerText === value && $("td")[7].innerText === value && $("td")[8].innerText === value) { setWinner([6, 7, 8]) }
        else if ($("td")[0].innerText === value && $("td")[3].innerText === value && $("td")[6].innerText === value) { setWinner([0, 3, 6]) }
        else if ($("td")[1].innerText === value && $("td")[4].innerText === value && $("td")[7].innerText === value) { setWinner([1, 4, 7]) }
        else if ($("td")[2].innerText === value && $("td")[5].innerText === value && $("td")[8].innerText === value) { setWinner([2, 5, 8]) }
        else if ($("td")[0].innerText === value && $("td")[4].innerText === value && $("td")[8].innerText === value) { setWinner([0, 4, 8]) }
        else if ($("td")[2].innerText === value && $("td")[4].innerText === value && $("td")[6].innerText === value) { setWinner([2, 4, 6]) }
        else if (tie(elements) && count === 9) { alert("EMPATEEEEEE!!!!!! ") }
    }
});