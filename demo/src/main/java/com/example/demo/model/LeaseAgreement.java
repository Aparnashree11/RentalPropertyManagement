package com.example.demo.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.Set;

@Entity
public class LeaseAgreement {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @ManyToOne
        @JoinColumn(name = "property_id")
        private Property property;

        private String tenant;
        private String owner;

        private String status;

        private LocalDate leaseStartDate;
        private LocalDate leaseEndDate;


        // Getters & Setters

        public Long getId() {
                return id;
        }

        public void setId(Long id) {
                this.id = id;
        }

        public Property getProperty() {
                return property;
        }

        public void setProperty(Property property) {
                this.property = property;
        }

        public String getTenant() {
                return tenant;
        }

        public void setTenant(String tenantName) {
                this.tenant = tenantName;
        }

        public String getOwner() {
                return owner;
        }

        public void setOwner(String ownerName) {
                this.owner = ownerName;
        }

        public LocalDate getLeaseStartDate() {
                return leaseStartDate;
        }

        public void setLeaseStartDate(LocalDate leaseStartDate) {
                this.leaseStartDate = leaseStartDate;
        }

        public LocalDate getLeaseEndDate() {
                return leaseEndDate;
        }

        public void setLeaseEndDate(LocalDate leaseEndDate) {
                this.leaseEndDate = leaseEndDate;
        }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
