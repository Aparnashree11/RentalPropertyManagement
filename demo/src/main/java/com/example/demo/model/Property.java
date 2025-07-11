package com.example.demo.model;

import jakarta.persistence.*;
import java.util.Set;

@Entity
public class Property {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String address;
    private Double rent;

    @ManyToOne
    private User owner;

    @OneToMany(mappedBy = "property")
    private Set<LeaseAgreement> leases;

    // Getters & Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Double getRent() {
        return rent;
    }

    public void setRent(Double rent) {
        this.rent = rent;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public Set<LeaseAgreement> getLeases() {
        return leases;
    }

    public void setLeases(Set<LeaseAgreement> leases) {
        this.leases = leases;
    }
}
