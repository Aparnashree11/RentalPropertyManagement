package com.example.demo.model;

import jakarta.persistence.*;
import java.util.Set;

@Entity
public class Tenant {
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private String name;
        private String email;
        private String phone;

        @OneToMany(mappedBy = "tenant")
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

        public String getEmail() {
                return email;
        }

        public void setEmail(String email) {
                this.email = email;
        }

        public String getPhone() {
                return phone;
        }

        public void setPhone(String phone) {
                this.phone = phone;
        }

        public Set<LeaseAgreement> getLeases() {
                return leases;
        }

        public void setLeases(Set<LeaseAgreement> leases) {
                this.leases = leases;
        }
}
