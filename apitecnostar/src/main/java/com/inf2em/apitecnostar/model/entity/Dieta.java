package br.com.tecnostar.model.entity;

public class Dieta {

    private Long id;
    private String nome;
    private String descricao;
    private Integer duracaoDias;
    private Double caloriasDiarias;
    private String nivel;

    public Dieta() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Integer getDuracaoDias() {
        return duracaoDias;
    }

    public void setDuracaoDias(Integer duracaoDias) {
        this.duracaoDias = duracaoDias;
    }

    public Double getCaloriasDiarias() {
        return caloriasDiarias;
    }

    public void setCaloriasDiarias(Double caloriasDiarias) {
        this.caloriasDiarias = caloriasDiarias;
    }

    public String getNivel() {
        return nivel;
    }

    public void setNivel(String nivel) {
        this.nivel = nivel;
    }
}