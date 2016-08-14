var createTable = "CREATE TABLE IF NOT EXISTS Pedidos(Id INTEGER PRIMARY KEY AUTOINCREMENT, NombreCliente varchar(50) NOT NULL, Telefono int(10) NOT NULL, Direccion varchar(50) NOT NULL, Carne varchar(50) NOT NULL, Kilos int(2) NOT NULL, Total int(10) NOT NULL, Metodo_Pago varchar(20) NOT NULL)";

var insertInto = "INSERT Into Pedidos(NombreCliente, Telefono, Direccion, Carne, Kilos, Total, Metodo_Pago) VALUES (?,?,?,?,?,?,?)";

var Select = "SELECT * FROM Pedidos";

var drop = "DROP TABLE Pedidos";

var Total = 0;
var Kilos = 0;
var precioCarne = 0;
var Carne = '';

function CalcularTotal()
{
	Carne = document.getElementById('Carne').value;
	Kilos = parseInt(document.getElementById('Kilos').value);
	
	//Obtenemos el precioCarne dependiendo de la seleccion del cliente
	switch(Carne)
	{
		case 'Chamorro':
			precioCarne = 95;
			break;
		case 'Costilla':
			precioCarne = 83;
			break;
		case 'Nana':
			precioCarne = 105;
			break;
		case 'Buche':
			precioCarne = 132;
			break;
		case 'Maciza':
			precioCarne = 123;
			break;
		case 'Tripa':
			precioCarne = 154;
			break;
		case 'Surtida':
			precioCarne = 190;
			break;
	}
	
	Total = precioCarne * Kilos;
	
	document.getElementById('Total').value = '$'+Total.toString()+'.00';
}

function ResetAll()
{
	document.getElementById('Nombre').value = '';
	document.getElementById('Telefono').value = '';
	document.getElementById('Direccion').value = '';
	document.getElementById('Total').value = '';
	document.getElementById('Kilos').value = 1;
}

//Iincializamos la BD
var db = openDatabase("ElPuerquitoVeloz", "1.0", "Base de datos EPV", "2000000");
var dataset;
var DataType;

function initdb()
{
	try
		{
			if (!window.openDatabase)
			{
				alert('Las Bases de Datos no son soportadas en este navegador');
			}
			else
			{
				crearTable();
				}
					
		}
		catch(e)
		{
			if(e == 2)
			{
				console.log("Version de BD invalida");
			}
			else
				{
				console.log("Error desconocido" + e + ".");
			}
			return;
		}
}

function crearTable()
	{
		db.transaction(function (tx){tx.executeSql(createTable, []);})	
	}
	

function insertar()
{
	var Nombre = document.getElementById('Nombre').value;
	var Telefono = parseInt(document.getElementById('Telefono').value);
	var Direccion = document.getElementById('Direccion').value;
	var MetodoPago = '';
	var Pago = document.getElementsByName('Pago');
	
	//Verificamos cual es el radio seleccionado
	for(var i = 0; i < Pago.length; i++)
	{
		if(Pago[i].checked)
		{
			MetodoPago = Pago[i].value;
			break;
		}
	}
	
	db.transaction(function (tx) {tx.executeSql(insertInto, [Nombre, Telefono, Direccion, Carne, Kilos, Total, MetodoPago]);});

}

function seleccionar()
{
	db.transaction(function(tx)
	{
		var divpe = document.getElementById("Verpedidos");
		tx.executeSql(Select, [], function(tx, resultado)
		{
			var rows = resultado.rows;
			divconte = '';
			for(var x = 0; x < rows.length; x++)
			{
				divconte += '<h1 class ="texto">Pedido #' + (x+1) + '</h1><br>';
				divconte += '<p class = "infopedido">Nombre del Cliente: '+ rows[x].NombreCliente + '</p><br>';
				divconte += '<p class = "infopedido">Telefono: ' + rows[x].Telefono + '</p><br>';
				divconte += '<p class = "infopedido">Dirección de envío: ' + rows[x].Direccion + '</p><br>';
				divconte += '<p class = "infopedido">Tipo de carne: ' + rows[x].Carne + '</p><br>';
				divconte += '<p class = "infopedido">Kilos ordenados: ' + rows[x].Kilos + '</p><br>';
				divconte += '<p class = "infopedido">Total a pagar: $' + rows[x].Total + '</p><br>';
				divconte += '<p class = "infopedido">Método de pago: ' +rows[x].Metodo_Pago+'</p><br>';
				divconte += '</p><br>';
			}
			
			divpe.innerHTML = divconte;
		})
	});
}

function borrarTable(){
		db.transaction(function (tx){tx.executeSql(drop, []);})
		}

function login()
{
	usuario = document.getElementById("User").value;
	contra = document.getElementById("Pass").value;
	if(usuario == 'Administrador')
	{
		if(contra == 'Marzo2016')
		{
			window.location.assign("Verpedidos.html");
		}
		else
		{
			alert('Contraseña incorrecta');
		}
	}
	else
	{
		alert('Usuario incorrecto');
	}
}
$(document).ready(function() {
	
	initdb();});
// JavaScript Document