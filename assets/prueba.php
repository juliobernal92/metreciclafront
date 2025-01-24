<?php
$contenido = "Prueba de impresión\n";
file_put_contents(__DIR__ . "/prueba_ticket.txt", $contenido);
$rutaArchivo = __DIR__ . "/prueba_ticket.txt";
$comando = "type \"$rutaArchivo\" > \"\\\\Desktop-01apfrc\\pos-58\"";
exec($comando . " 2>&1", $output, $resultCode);
echo "Comando ejecutado: $comando\n";
echo "Resultado: $resultCode\n";
echo "Salida:\n" . implode("\n", $output);
