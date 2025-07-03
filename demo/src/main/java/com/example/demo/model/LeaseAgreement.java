package com.example.demo.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.Set;

@Entity
public class LeaseAgreement {
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private LocalDate startDate;
        private LocalDate endDate;
        private Double monthlyRent;

        @ManyToOne
        private Property property;

        @ManyToOne
        private Tenant tenant;

        @OneToMany(mappedBy = "leaseAgreement")
        private Set<Payment> payments;

        // Getters & Setters

        public LocalDate getStartDate() {
                return startDate;
        }

        public void setStartDate(LocalDate startDate) {
                this.startDate = startDate;
        }

        public LocalDate getEndDate() {
                return endDate;
        }

        public void setEndDate(LocalDate endDate) {
                this.endDate = endDate;
        }

        public Double getMonthlyRent() {
                return monthlyRent;
        }

        public void setMonthlyRent(Double monthlyRent) {
                this.monthlyRent = monthlyRent;
        }

        public Property getProperty() {
                return property;
        }

        public void setProperty(Property property) {
                this.property = property;
        }

        public Tenant getTenant() {
                return tenant;
        }

        public void setTenant(Tenant tenant) {
                this.tenant = tenant;
        }

        public Set<Payment> getPayments() {
                return payments;
        }

        public void setPayments(Set<Payment> payments) {
                this.payments = payments;
        }

        public Long getId() {
                return id;
        }

        public void setId(Long id) {
                this.id = id;
        }
}
