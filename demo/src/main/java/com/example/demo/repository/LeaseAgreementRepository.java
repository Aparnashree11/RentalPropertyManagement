package com.example.demo.repository;

import com.example.demo.model.LeaseAgreement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LeaseAgreementRepository extends JpaRepository<LeaseAgreement, Long> {
}
