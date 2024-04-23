

function insertScore() {
    let tableBody = $(".scores").find("tbody");
    let user = "Kauã";
    let nWords = $(".wordsTyped").text();

    let line = newScoreLine(user,nWords);

    tableBody.prepend(line);
    
}

function newScoreLine(user, nWords){
    let line = $("<tr>");
    let userColumn = $("<td>").text(user)
    let nWordsColumn = $("<td>").text(nWords)

    let removeColumn = $("<td>")
    let link = $("<a>").addClass("removeButton").attr("href","#");
    let icon = $("<i>").addClass("small").addClass("material-icons").text("delete");

    link.append(icon);
    removeButtonStup(link);
    removeColumn.append(link)

    line.append(userColumn).append(nWordsColumn).append(removeColumn);
    return line
}

function removeButtonStup(element){
    $(element).click( function(event){
        event.preventDefault();
        $(this).parent().parent().remove();

    });
}