package com.examen.reciclaje.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examen.reciclaje.entidades.PuntoReciclaje;
import com.examen.reciclaje.repositories.PuntoReciclajeRepository;

@RestController
@RequestMapping("/api/puntos")
@CrossOrigin(origins = "http://localhost:5173")
public class PuntoReciclajeController {

    private final PuntoReciclajeRepository puntoReciclajeRepository;

    public PuntoReciclajeController(
            PuntoReciclajeRepository puntoReciclajeRepository) {

        this.puntoReciclajeRepository =
                puntoReciclajeRepository;
    }

    @GetMapping
    public ResponseEntity<List<PuntoReciclaje>>
            listarPuntos() {

        List<PuntoReciclaje> puntos =
                puntoReciclajeRepository.findAll();

        return ResponseEntity.ok(puntos);
    }

    @PostMapping
    public ResponseEntity<PuntoReciclaje>
            registrarPunto(
                    @RequestBody PuntoReciclaje punto) {

        PuntoReciclaje puntoGuardado =
                puntoReciclajeRepository.save(punto);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(puntoGuardado);
    }
}