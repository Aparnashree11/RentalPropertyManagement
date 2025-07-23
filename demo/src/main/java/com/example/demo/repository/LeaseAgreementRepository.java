package com.example.demo.repository;

import com.example.demo.model.LeaseAgreement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LeaseAgreementRepository extends JpaRepository<LeaseAgreement, Long> {
    List<LeaseAgreement> findByOwner(String owner);

    List<LeaseAgreement> findByTenant(String name);
}
