//TODO add actual code

var dataDisplayTable = document.getElementsByClassName('datadisplaytable')

if (dataDisplayTable != null){
    window.exportAction = function() {
        alert("exportAction called!")
    }

    var button = document.createElement("input")
    button.id = "export_button"
    button.type = "button"
    button.value = "Export to CSV"
    button.onclick = window.exportAction
    button.style.width = "100%"
    button.style.height = "100px"
    button.style.fontSize = "32pt"
    button.style.backgroundColor = "#003366"
    document.body.insertBefore(button, document.body.children[0])
}
