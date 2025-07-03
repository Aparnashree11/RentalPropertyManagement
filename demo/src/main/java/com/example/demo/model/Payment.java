package com.example.demo.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Payment {

        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private LocalDate paymentDate;
        private Double amount;
        private String paymentMethod;

        @ManyToOne
        private LeaseAgreement leaseAgreement;

        // Getters & Setters

        public Long getId() {
                return id;
        }

        public void setId(Long id) {
                this.id = id;
        }

        public LocalDate getPaymentDate() {
                return paymentDate;
        }

        public void setPaymentDate(LocalDate paymentDate) {
                this.paymentDate = paymentDate;
        }

        public Double getAmount() {
                return amount;
        }

        public void setAmount(Double amount) {
                this.amount = amount;
        }

        public String getPaymentMethod() {
                return paymentMethod;
        }

        public void setPaymentMethod(String paymentMethod) {
                this.paymentMethod = paymentMethod;
        }

        public LeaseAgreement getLeaseAgreement() {
                return leaseAgreement;
        }

        public void setLeaseAgreement(LeaseAgreement leaseAgreement) {
                this.leaseAgreement = leaseAgreement;
        }
}

